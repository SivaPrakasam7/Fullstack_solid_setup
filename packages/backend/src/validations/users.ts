import * as yup from 'yup';

export const createUserValidation = yup
    .object()
    .shape({
        name: yup.string().required('Name is required'),
        email: yup
            .string()
            .email('Email must be valid')
            .required('Email is required'),
        password: yup.string(),
        providerId: yup.string(),
        profileURL: yup.string(),
    })
    .test(
        'either-password-or-providerId',
        'Either password or providerId is required',
        (value) => {
            const { password, providerId } = value || {};
            return !!password || !!providerId;
        }
    );

export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .email('Email must be valid')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
});

export const forgotPasswordValidation = yup.object().shape({
    email: yup.string().required('Email is required'),
});

export const resetPasswordValidation = yup.object().shape({
    password: yup.string().required('Password is required'),
});
