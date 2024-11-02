<template>
    <div class="w-full">
        <label
            :for="name"
            class="block mb-1 text-sm font-bold text-gray-600 dark:text-white"
            >{{ label
            }}<span
                v-show="label && required"
                class="text-red-400 font-bold text-xs"
                >*</span
            ><span class="text-xs">{{
                type === 'tag'
                    ? '(separated by commas, semicolons, or newlines)'
                    : ''
            }}</span></label
        >
        <div
            :class="[
                'flex text-md border border-gray-300 hover:border-gray-500 text-md w-full rounded-xl relative items-center gap-1 transition-border duration-300',
                layoutClass,
                disabled ? 'bg-gray-400 text-gray-400 dark:text-gray-300' : '',
            ]"
        >
            <slot name="startIcon" />
            <input
                v-if="type !== 'textarea'"
                v-model="handleInput"
                :data-testId="name"
                :name="name"
                :type="show ? 'text' : type"
                :placeholder="placeHolder"
                :disabled="disabled"
                :min="min"
                :format="format"
                :class="[
                    'text-md w-full rounded-xl outline-none bg-transparent',
                    size,
                ]"
                @input="limitInput($event)"
                @keypress="filterNumericInput"
                @paste="filterPaste"
                @focus="focus"
                @blur="blur"
            />
            <textarea
                v-if="type === 'textarea'"
                v-model="handleInput"
                :data-testId="name"
                :name="name"
                :placeholder="placeHolder"
                :disabled="disabled"
                :min="min"
                :multiple="true"
                :rows="rows"
                :class="['w-full rounded-xl outline-none bg-transparent', size]"
                style="resize: none"
            />
            <button
                v-if="type === 'password'"
                class="mr-4"
                oncontextmenu="return false;"
                @click="toggle()"
            >
                <SvgIcon
                    v-if="show"
                    path="/icons/svg/visibility.svg"
                    class="h-6 w-6"
                ></SvgIcon>
                <SvgIcon
                    v-else
                    path="/icons/svg/visibility_off.svg"
                    class="h-6 w-6"
                ></SvgIcon>
            </button>
            <slot name="endIcon" />
        </div>
        <p
            :data-testId="`${name}-error`"
            :class="[
                'mt-1 text-xs italic min-h-4',
                error ? 'text-red-400' : 'text-gray-400',
            ]"
        >
            {{ error || helperText }}
        </p>
        <div v-if="type === 'tag'" class="w-full block">
            <p
                v-for="tag in getTagValues(handleInput)"
                :key="tag"
                class="text-xs rounded-full border border-gray-300 w-fit px-2 pb-0.5 float-left m-0.5"
            >
                {{ tag }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import SvgIcon from '../svg.vue';

export default {
    name: 'TextField',
    components: { SvgIcon },
    props: {
        name: {
            required: true,
            type: String,
        },
        label: {
            default: '',
            type: String,
        },
        placeHolder: {
            default: '',
            type: String,
        },
        helperText: {
            default: '',
            type: String,
        },
        value: {
            default: '',
            type: String,
        },
        error: {
            default: '',
            type: String,
        },
        disabled: {
            default: false,
            type: Boolean,
        },
        type: {
            default: 'text',
            type: String as PropType<IFieldType>,
        },
        min: {
            default: '',
            type: String,
        },
        max: {
            default: '',
            type: String,
        },
        size: {
            default: 'p-3 text-md',
            type: String,
        },
        rows: {
            default: '',
            type: String,
        },
        required: {
            default: false,
            type: Boolean,
        },
        layoutClass: {
            default: '',
            type: String,
        },
        format: {
            default: '',
            type: String,
        },
    },
    emits: ['onchange'],
    data() {
        return {
            handleInput: this.value,
            show:
                ['date', 'datetime-local', 'time'].includes(this.type) || false,
        };
    },
    watch: {
        handleInput(value) {
            this.$emit('onchange', {
                name: this.name,
                value,
            });
        },
        value(propsValue) {
            this.handleInput = propsValue;
        },
    },
    methods: {
        toggle() {
            this.show = !this.show;
        },
        limitInput(event: Event) {
            const target = event.target as HTMLInputElement;
            if (this.type === 'number' && target.value.length >= 19) {
                target.value = target.value.slice(0, 19);
                this.handleInput = target.value;
            }
        },
        filterNumericInput(event: KeyboardEvent) {
            if (this.type === 'number') {
                const char = String.fromCharCode(event.keyCode);
                if (
                    !/[0-9]/.test(char) &&
                    ![8, 9, 13, 37, 39].includes(event.keyCode)
                ) {
                    event.preventDefault();
                }
            }
        },
        filterPaste(event: ClipboardEvent) {
            if (this.type === 'number') {
                const pasteData = event.clipboardData?.getData('text');
                if (pasteData && !/^\d+$/.test(pasteData)) {
                    event.preventDefault();
                }
            }
        },
        getTagValues(v: string) {
            return [
                ...new Set(
                    v
                        .split(/( |;|,)/g)
                        .filter((t) => !!t.replaceAll(/(\s|;|,)/g, '').trim())
                ),
            ];
        },
        focus() {
            if (['date', 'datetime-local', 'time'].includes(this.type))
                this.show = false;
        },
        blur() {
            if (['date', 'datetime-local', 'time'].includes(this.type))
                this.show = true;
        },
    },
};

export type IFieldType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'password'
    | 'tag';
</script>
