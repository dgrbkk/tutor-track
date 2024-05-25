import * as lessonService from '../services/lesson.service.js';

export const createLesson = async (req, res, next) => {
  try {
    const data = await lessonService.addNewLesson(req.body, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (req, res, next) => {
  try {
    const data = await lessonService.updateLesson(req.params.id, req.body, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};


export const deleteLesson = async (req, res, next) => {
  try {
    const data = await lessonService.deleteLesson(req.params.id, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};


export const getLessonWithPayment = async (req, res, next) => {
  try {
    const data = await lessonService.getLessonById(req.params.id, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const getLessonsForTeacherForTimePeriod = async (req, res, next) => {
  try {
    const data = await lessonService.getLessonsForDurationForTeacher(req.query.start, req.query.end, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};


export const getLessonsForStudentForTimePeriod = async (req, res, next) => {
  try {
    const data = await lessonService.getLessonsForDurationForTeachersStudent(req.query.start, req.query.end, req.params.id, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};


