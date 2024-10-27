<template>
    <div
        class="flex flex-col gap-5 items-center justify-center h-screen w-screen"
    >
        <div class="max-w-[400px] w-full flex flex-col gap-2 p-2">
            <p class="text-4xl font-bold">Sign Up</p>
            <FormBuilder
                :form="form"
                :call="call"
                button-text="Sign Up"
                layout-class="gap-4 max-w-[400px] w-full"
            />
            <div class="w-full border-t border-gray-600"></div>
            <a
                href="/sign-in"
                class="text-md underline text-gray-500 hover:text-current"
                >Already have an account?</a
            >
        </div>
    </div>
</template>

<script lang="ts">
//
import { register } from 'src/repository/authentication';

//
import FormBuilder from 'src/app/components/form/main.vue';

export default {
    name: 'SignInPage',
    components: {
        FormBuilder,
    },
    data() {
        return {
            form: {
                name: {
                    label: 'Name',
                    placeHolder: 'Enter your name',
                    type: 'text',
                    required: true,
                    value: '',
                    requiredLabel: 'Please enter your name',
                },
                email: {
                    label: 'Email',
                    placeHolder: 'Enter your email',
                    type: 'text',
                    required: true,
                    value: '',
                    requiredLabel: 'Please enter your email',
                },
                password: {
                    label: 'Password',
                    placeHolder: 'Enter your password',
                    type: 'password',
                    required: true,
                    value: '',
                    requiredLabel: 'Password is required',
                },
                confirmPassword: {
                    label: 'Confirm Password',
                    placeHolder: 'Re-enter your password',
                    type: 'password',
                    required: true,
                    value: '',
                    requiredLabel: 'Confirmation password is required',
                },
            } as Record<string, ILargeRecord>,
        };
    },
    methods: {
        async call(payload: ILargeRecord) {
            await register(payload);
        },
    },
};
</script>
