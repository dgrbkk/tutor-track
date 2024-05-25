import * as studentController from '../controllers/student.controller.js';
import {Router} from 'express';
import * as auth from '../middlewares/auth.middleware.js';
import * as validators from '../middlewares/validators.middleware.js';
import {checkValidationMiddleware} from "../middlewares/error-handler.middleware.js";


const router = new Router();

router.post('', auth.checkAuth, validators.studentValidator, checkValidationMiddleware, studentController.createStudent);

router.put('/:id', auth.checkAuth, validators.studentValidator, checkValidationMiddleware, studentController.updateStudent);

router.delete('/:id', auth.checkAuth, studentController.deleteStudent);

router.get('/all', auth.checkAuth, studentController.getTeacherStudents);

router.get('/:id', auth.checkAuth, studentController.getStudentWithInfo);



export default router;
