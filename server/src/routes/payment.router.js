import {Router} from 'express';
import * as auth from '../middlewares/auth.middleware.js';
import * as validators from '../middlewares/validators.middleware.js';
import * as paymentController from '../controllers/payment.controller.js';
import {checkValidationMiddleware} from '../middlewares/error-handler.middleware.js';
import * as studentController from "../controllers/student.controller.js";
import * as lessonController from "../controllers/lesson.controller.js";

const router = new Router();

router.get('/unpaid', auth.checkAuth, paymentController.getUnpaidLessonsForTeacher);

router.put('/:id', auth.checkAuth, validators.paymentUpdateValidator,
 checkValidationMiddleware, paymentController.updatePayment);

router.get('/student/:id', auth.checkAuth, validators.periodValidator, checkValidationMiddleware, paymentController.getPaymentsForStudentForTimePeriodWithTotal);

router.get('', auth.checkAuth, validators.periodValidator, checkValidationMiddleware, paymentController.getPaymentsForTeacherForTimePeriodWithTotal);
//router.delete('/:id', auth.checkAuth, lessonController.deleteLesson);

//router.get('/slots/busy', auth.checkAuth, validators.dateValidator, lessonController.bred);

export default router;
