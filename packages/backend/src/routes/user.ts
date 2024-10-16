import express from 'express';
import { createUserController } from 'src/controller/user';

const router = express.Router();

router.route('/create').post(createUserController);

export default router;
