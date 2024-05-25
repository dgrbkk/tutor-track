import * as teacherService from '../services/teacher.service.js';



export const getMyAccountData = async (req, res, next) => {
  try {
    const data = await teacherService.getTeacherById(req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const updateMyAccountData = async (req, res, next) => {
  try {
    const data = await teacherService.updateTeacherById(req.id, req.body);
    return res.json({data: data});
  } catch (error) {
    next(error);
  }
};

export const getAll = async (_req, res, next) => {
  try {
    const teachers = await teacherService.getAll();
    return res.json({ data: teachers });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await teacherService.getTeacherById(id);

    return res.json({ data: teacher });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const students = await teacherService.getStudents(id);

    return res.json({ data: students });
  } catch (error) {
    next(error);
  }
};



