import * as studentService from '../services/student.service.js';
import * as lessonService from "../services/lesson.service.js";

export const getTeacherStudents  = async (req, res, next) => {
  try {
    const data = await studentService.getStudentsForTeacher(req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const getStudentWithInfo  = async (req, res, next) => {
  try {
    const data = await studentService.getStudentById(req.params.id, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};



export const createStudent = async (req, res, next) => {
  try {
    const data = await studentService.addNewStudent(req.body, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const data = await studentService.updateStudent(req.params.id, req.body, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const data = await studentService.deleteStudent(req.params.id, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};


