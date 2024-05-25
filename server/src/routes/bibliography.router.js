import express, {Router} from 'express';
import * as bibliographyController from '../controllers/bibliography.controller.js';
import * as validators from '../middlewares/validators.middleware.js';
import * as bibliographies from '../helpers/bibliography.helper.js';
import * as auth from '../middlewares/auth.middleware.js';
import {checkValidationMiddleware} from "../middlewares/error-handler.middleware.js";



const router = new Router();

router.post('', auth.checkAuth, bibliographies.upload.single('pdf'),
  validators.bibliographyValidator, bibliographyController.createBibliographyForTeacher);

router.use('/documents', express.static('bibliographies'));

router.delete('/:id', auth.checkAuth, bibliographyController.deleteBibliography);

router.get('/student/:id', auth.checkAuth, bibliographyController.getBibliographiesForStudent);

router.post('/student/:id', auth.checkAuth, bibliographyController.addExistingBibliographyToStudent);

router.delete('/student/:id', auth.checkAuth, bibliographyController.deleteBibliographyFromStudent);

router.post('/student', auth.checkAuth, bibliographies.upload.single('pdf'),
  validators.bibliographyValidator, checkValidationMiddleware,  bibliographyController.addNewBibliographyToStudent);

router.get('', auth.checkAuth, bibliographyController.getBibliographiesForTeacher);
export default router;
