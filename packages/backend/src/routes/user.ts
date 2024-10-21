import express from 'express';
import {
    changePasswordController,
    createUserController,
    forgotPasswordController,
    loginController,
    userController,
    requestVerifyController,
    verifyController,
} from 'src/controller/user';
import { tokenChecker } from 'src/handler/tokenVerification';
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

router.route('/request-verification').get(requestVerifyController);
router.route('/verify').get(tokenChecker, verifyController);
router
    .route('/request-reset-password')
    .post(validator(forgotPasswordValidation), forgotPasswordController);
router
    .route('/change-password')
    .post(
        tokenChecker,
        validator(resetPasswordValidation),
        changePasswordController
    );

export default router;
