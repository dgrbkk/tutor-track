import teacherRouter from './teacher.router.js';
import * as auth from '../helpers/auth.helper.js';
import express from 'express';
import authRouter from './auth.router.js';
import bibliographyRouter from './bibliography.router.js';
import studentRouter from './student.router.js';
import lessonRouter from './lesson.router.js';
import paymentRouter from './payment.router.js';



export default (app) => {
  app.use('/teacher', teacherRouter);

  app.use('/auth', authRouter);

  app.use('/bibliography', bibliographyRouter);

  app.use('/student', studentRouter);

  app.use('/lesson', lessonRouter);

  app.use('/payment', paymentRouter);

  app.post('/upload', auth.upload.single('image'), (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });

  app.use('/uploads', express.static('uploads'));


  /* app.post('/documents', bibliographies.upload.single('pdf'), (req, res) => {
    res.json({
      url: `/documents/${req.file.originalname}`,
    });
  });

  app.use('/documents', express.static('bibliographies')); */

};
