<template>
    <div
        class="flex flex-col gap-5 items-center justify-center h-screen w-screen"
    >
        <div class="max-w-[400px] w-full flex flex-col gap-2 p-2">
            <p class="text-4xl font-bold">Reset Password</p>
            <FormBuilder
                :form="form"
                :call="call"
                button-text="Change Password"
                layout-class="gap-4 max-w-[400px] w-full"
            />
        </div>
    </div>
</template>

<script lang="ts">
//
import { requestResetPassword } from 'src/repository/authentication';
import { passwordRegex } from 'src/constants/regex';

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
                password: {
                    label: 'New Password',
                    placeHolder: 'Enter your password',
                    type: 'password',
                    required: true,
                    value: '',
                    requiredLabel: 'Please enter your password',
                    validations: [
                        {
                            type: 'regex',
                            validate: passwordRegex,
                            message:
                                'Password must contain at least one uppercase letter, one lower case, one number, one symbol(@$!%*?&#), and be at least 8 characters long',
                        },
                    ],
                },
                confirmPassword: {
                    label: 'Re-Enter New Password',
                    placeHolder: 'Re-enter your password',
                    type: 'password',
                    required: true,
                    value: '',
                    requiredLabel: 'Please enter confirmation password',
                },
            } as Record<string, ILargeRecord>,
        };
    },
    methods: {
        async call(payload: ILargeRecord) {
            const res = await requestResetPassword(payload);
            return !res.error;
        },
    },
};
</script>
