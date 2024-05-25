import {Router} from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as validators from '../middlewares/validators.middleware.js';
import * as auth from '../middlewares/auth.middleware.js';
import {checkValidationMiddleware} from '../middlewares/error-handler.middleware.js';


const router = new Router();

router.post('/register', validators.registrationValidator, checkValidationMiddleware, authController.registration);

router.post('/login', validators.loginValidator, checkValidationMiddleware, authController.login);

router.patch('/password', auth.checkAuth, validators.passwordValidator, checkValidationMiddleware, authController.changePassword);

router.delete('', auth.checkAuth, authController.deleteAccount);

export default router;
