import {Router} from 'express';
import * as teacherController from '../controllers/teacher.controller.js';
import * as auth from '../middlewares/auth.middleware.js';
import * as validators from '../middlewares/validators.middleware.js';
import {checkValidationMiddleware} from '../middlewares/error-handler.middleware.js';

const router = new Router();

router.get('', auth.checkAuth, teacherController.getMyAccountData);

router.get('/:id', teacherController.getOne);

router.get('/:id/students', teacherController.getStudents);

router.put('', auth.checkAuth, validators.profileUpdateValidator, checkValidationMiddleware, teacherController.updateMyAccountData);


export default router;
