import express from 'express';
import {
    changePasswordController,
    createUserController,
    forgotPasswordController,
    loginController,
    userController,
    verifyController,
} from 'src/controller/user';
import { validator } from 'src/handler/validator';
import {
    createUserValidation,
    forgotPasswordValidation,
    loginValidation,
    resetPasswordValidation,
} from 'src/validations/users';

const router = express.Router();

router
    .route('/create')
    .post(validator(createUserValidation), createUserController);
router.route('/login').post(validator(loginValidation), loginController);
router.route('/profile').post(userController);

router.route('/verify').get(verifyController);
router
    .route('/request-reset-password')
    .post(validator(forgotPasswordValidation), forgotPasswordController);
router
    .route('/change-password')
    .post(validator(resetPasswordValidation), changePasswordController);

export default router;
