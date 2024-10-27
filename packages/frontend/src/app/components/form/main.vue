<template>
    <div :class="['grid gap-2 p-2 w-full', layoutClass]">
        <div
            v-for="[fieldName, field] in Object.entries(data || {}).filter(
                ([_, field]) => !field.ref
            )"
            :key="fieldName"
            :class="field.alignClass"
        >
            <SelectField
                v-if="field.type === 'select'"
                :name="fieldName"
                :label="field.label"
                :value="field.value"
                :error="field.error"
                :required="field.required"
                :place-holder="field.placeHolder"
                :size="field.size"
                :disabled="field.disabled || loading"
                :class="field.class"
                :layout-class="field.layoutClass"
                :options="field.options || []"
                @onchange="onFieldChange"
                ><template #startIcon>
                    <slot :name="`${fieldName}StartIcon`" />
                </template>
                <template #endIcon>
                    <slot :name="`${fieldName}EndIcon`" /> </template
            ></SelectField>
            <FileUpload
                v-else-if="field.type === 'file'"
                :name="fieldName"
                :label="field.label"
                :value="field.value"
                :error="field.error"
                :required="field.required"
                :place-holder="field.placeHolder"
                :image-size="field.imageSize"
                :accept="field.accept"
                :size="field.size"
                :max="field.max"
                :class="field.class"
                :layout-class="field.layoutClass"
                :disabled="field.disabled || loading"
                @onchange="onFieldChange"
                ><template #uploadIcon>
                    <slot :name="`${fieldName}UploadIcon`" /> </template
            ></FileUpload>
            <TextField
                v-else
                :name="fieldName"
                :label="field.label"
                :value="field.value"
                :error="field.error"
                :required="field.required"
                :place-holder="field.placeHolder"
                :type="field.type"
                :size="field.size"
                :disabled="field.disabled || loading"
                :rows="field.rows"
                :min="field.min"
                :max="field.max"
                :class="field.class"
                :layout-class="field.layoutClass"
                :format="field.format"
                @onchange="onFieldChange"
            >
                <template #startIcon>
                    <slot :name="`${fieldName}StartIcon`" />
                </template>
                <template #endIcon>
                    <slot :name="`${fieldName}EndIcon`" />
                </template>
            </TextField>
        </div>
        <button
            :loading="loading"
            :disabled="loading"
            type="submit"
            data-testId="SUBMIT"
            :class="['app-button', loading ? 'text-gray-400' : '', buttonClass]"
            oncontextmenu="return false;"
            @click="onSubmit"
        >
            <span :hidden="!loading">
                <svg
                    aria-hidden="true"
                    class="mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    :class="['w-6 h-6']"
                    viewBox="0 0 100 101"
                    fill="none"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
            </span>
            {{ buttonText }}
        </button>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

//
import FileUpload from './fileUpload.vue';
import SelectField from './selectField.vue';
import TextField from './textField.vue';

//
export default {
    name: 'FormBuilder',
    components: { FileUpload, SelectField, TextField },
    props: {
        form: {
            required: true,
            type: Object as PropType<Record<string, IFormField>>,
        },
        call: {
            required: true,
            type: Function as PropType<
                (...args: ILargeRecord) => Promise<boolean>
            >,
        },
        buttonText: {
            default: 'Submit',
            type: String,
        },
        buttonClass: {
            default: '',
            type: String,
        },
        layoutClass: {
            default: '',
            type: String,
        },
    },
    data() {
        return {
            data: {} as Record<string, IFormField>,
            initialData: {} as Record<string, IFormField>,
            loading: false,
            debounceTimer: 0 as ITimer,
        };
    },
    created() {
        this.data = this.form;
        this.initialData = { ...this.data };
    },
    methods: {
        getPayload() {
            const payload: Record<string, ILargeRecord> = {};
            for (const key in this.data) {
                payload[key] =
                    this.data[key].type === 'tag'
                        ? this.getTagValues(this.data[key].value)
                        : this.data[key].value;
            }
            return payload;
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
        onFieldChange(field: IFieldChange) {
            this.data[field.name] = {
                ...this.data[field.name],
                value: field.value,
            };

            if (this.debounceTimer) clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(() => {
                const fieldData = this.data[field.name];
                this.validateField(field.name, fieldData);
            }, 500);
        },
        async validateField(name: string, fieldData: IFormField) {
            let errorMessage = '';
            const value = fieldData.value || '';

            if (
                fieldData.required &&
                (fieldData.type === 'tag'
                    ? !value
                          .split(/( |;|,)/g)
                          .filter((t: string) =>
                              t.replaceAll(/(\s|;|,)/g, '').trim()
                          ).length
                    : typeof value === 'object'
                      ? !value.length
                      : !value.trim())
            ) {
                errorMessage =
                    fieldData.requiredLabel ||
                    `${fieldData.label || 'field'} is required`;
            } else if (value && fieldData.validations) {
                for (const key in fieldData.validations) {
                    const validation = fieldData.validations[key];
                    const regex = new RegExp(validation.validate as string);
                    if (
                        (validation.type === 'regex' &&
                            typeof value === 'object' &&
                            value.filter((v: ILargeRecord) => !regex.test(v))
                                .length) ||
                        (fieldData.type === 'tag'
                            ? value.split(/( |;|,)/g).filter((t: string) => {
                                  const data = t
                                      .replaceAll(/(\s|;|,)/g, '')
                                      .trim();
                                  if (data) return !regex.test(data);
                                  return false;
                              }).length
                            : !regex.test(value))
                    ) {
                        errorMessage = validation.message || 'Invalid value';
                    } else if (validation.type === 'function') {
                        const call = validation.validate as (
                            values: ILargeRecord
                        ) => Promise<string> | string;
                        errorMessage = await call(value);
                    }
                    if (errorMessage) break;
                }
            }
            this.data[name].error = errorMessage;
        },
        async validate() {
            Object.keys(this.data).forEach((field) => {
                this.validateField(field, this.data[field]);
            });
            return !Object.values(this.data).filter((f) => Boolean(f.error))
                .length;
        },
        async onSubmit() {
            this.loading = true;
            const payload = this.getPayload();
            if (await this.validate()) {
                const success = await this.call(payload);
                if (success) this.data = this.initialData;
            }
            this.loading = false;
        },
    },
};

export interface IFormField {
    label: string;
    value?: ILargeRecord;
    error?: string;
    validations?: {
        type: 'regex' | 'function';
        message: string;
        validate: string | ((values: ILargeRecord) => Promise<string> | string);
    }[];
    required?: boolean;
    requiredLabel?: string;
    type?:
        | 'text'
        | 'textarea'
        | 'number'
        | 'select'
        | 'date'
        | 'time'
        | 'datetime-local'
        | 'file'
        | 'tag';
    placeHolder?: string;
    rows?: string;
    alignClass?: string;
    class?: string;
    layoutClass?: string;
    imageSize?: string;
    size?: string;
    disabled?: boolean;
    multiple?: boolean;
    min?: string;
    max?: string;
    accept?: string;
    format?: string;
    options?: string[];
    buttonText?: string;
    buttonSize?: string;
    ref?: string;
    initialFieldCount?: number;
    remove?: (_index: string) => void;
}

export type IFieldChange = {
    name: string;
    value: ILargeRecord;
    ignoreValidation?: boolean;
    ref?: string;
};
</script>
