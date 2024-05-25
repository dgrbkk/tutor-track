import {Router} from 'express';
import * as auth from '../middlewares/auth.middleware.js';
import * as validators from '../middlewares/validators.middleware.js';
import * as lessonController from '../controllers/lesson.controller.js';
import {checkValidationMiddleware} from '../middlewares/error-handler.middleware.js';


const router = new Router();

router.post('', auth.checkAuth, validators.lessonValidator,
  validators.dateValidator, checkValidationMiddleware, lessonController.createLesson);

router.get('/:id', auth.checkAuth, lessonController.getLessonWithPayment);

router.put('/:id', auth.checkAuth, validators.lessonUpdateValidator,
  validators.dateValidator, checkValidationMiddleware, lessonController.updateLesson);

router.delete('/:id', auth.checkAuth, lessonController.deleteLesson);

router.get('', auth.checkAuth, validators.periodValidator, checkValidationMiddleware,
    lessonController.getLessonsForTeacherForTimePeriod);

router.get('/student/:id', auth.checkAuth, validators.periodValidator, checkValidationMiddleware, lessonController.getLessonsForStudentForTimePeriod);



export default router;
