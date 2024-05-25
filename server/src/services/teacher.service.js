import teacherRepository from '../repositories/teacher.repository.js';
import {ConflictError, NotFoundError} from '../helpers/httpErrors.js';


export const getAll = async () => {
  return await teacherRepository.getAll();
};

export const getTeacherById = async (id) => {
  const teacher = await teacherRepository.getOne(id);
  if (!teacher) throw new NotFoundError('User');

  return teacher;
};

export const getTeacherByEmail = async (email) => {
  const teacher = await teacherRepository.getOneByEmail(email);
  if (!teacher) throw new NotFoundError('User');

  return teacher;
};
export const getStudents = async (id) => {
  const teacher = await teacherRepository.getOne(id);
  if (!teacher) throw new NotFoundError('User');

  return await teacherRepository.getStudentsByTeacherId(id);
};

export const updateTeacherById = async (id, data) => {
  const teacherP = await teacherRepository.getOneByPhone(data.phoneNumber);
  if (teacherP && teacherP.id !== id) throw new ConflictError('Try another phone, this one');

  const teacher = await teacherRepository.getOne(id);
  if (!teacher) throw new NotFoundError('Teacher/User not found');

  return await teacherRepository.updateInstanceById(data, id);
};





