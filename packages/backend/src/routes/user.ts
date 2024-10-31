import express from 'express';
import {
    changePasswordController,
    createUserController,
    forgotPasswordController,
    loginController,
    userController,
    requestVerifyController,
    verifyController,
    logoutController,
} from 'src/controller/user';
import {
    headerTokenChecker,
    tokenChecker,
} from 'src/handler/tokenVerification';
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
router.route('/profile').get(tokenChecker, userController);

router.route('/request-verification').get(requestVerifyController);
router.route('/verify').get(headerTokenChecker, verifyController);
router
    .route('/request-reset-password')
    .post(validator(forgotPasswordValidation), forgotPasswordController);
router
    .route('/change-password')
    .post(
        headerTokenChecker,
        validator(resetPasswordValidation),
        changePasswordController
    );
router.route('/logout').get(logoutController);

export default router;
