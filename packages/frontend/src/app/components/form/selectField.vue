<template>
    <div class="w-full">
        <label
            :for="name"
            class="block mb-1 text-sm font-bold text-gray-600 dark:text-white"
            >{{ label
            }}<span v-show="required" class="text-red-500 font-bold text-xs"
                >*</span
            ></label
        >
        <div
            :class="[
                'flex gap-2 text-md border border-gray-300 hover:border-gray-500 dark:border-gray-250 dark:hover:border-hoverBlue text-md w-full rounded-xl pr-2',
                layoutClass,
            ]"
        >
            <slot name="startIcon" />
            <select
                :id="name"
                v-model="handleInput"
                :name="name"
                :data-testId="name"
                :class="[
                    'w-full rounded-xl outline-none bg-white dark:bg-gray-550 text-customText dark:text-white',
                    size || 'p-3 text-md',
                    disabled
                        ? 'bg-gray-200 text-gray-400 dark:text-gray-300'
                        : '',
                    handleInput
                        ? '!text-default'
                        : 'text-gray-500 text-sm py-3.5',
                ]"
                :disabled="disabled"
                :multiple="multiple"
                :placeholder="placeHolder"
            >
                <option v-show="placeHolder" value="" disabled selected>
                    {{ placeHolder }}
                </option>
                <option
                    v-for="option in options"
                    :key="option"
                    :value="option"
                    class="text-default"
                >
                    {{ option }}
                </option>
            </select>
            <slot name="endIcon" />
        </div>
        <p
            :data-testId="`${name}-error`"
            :class="[
                'mt-1 text-xs italic',
                error ? 'text-red-500' : 'text-gray-400',
            ]"
        >
            {{ error || helperText }}
        </p>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
    name: 'SelectField',
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
        multiple: {
            default: false,
            type: Boolean,
        },
        size: {
            default: 'p-3 text-md',
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
        options: {
            required: true,
            type: Array as PropType<string[]>,
        },
    },
    emits: ['onchange'],
    data() {
        return {
            handleInput: this.value,
        };
    },
    watch: {
        handleInput(value) {
            this.$emit('onchange', { name: this.name, value });
        },
        value(propsValue) {
            this.handleInput = propsValue;
        },
    },
};
</script>
