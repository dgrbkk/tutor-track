import {ConflictError, ForbiddenError, NotFoundError} from '../helpers/httpErrors.js';
import studentRepository from '../repositories/student.repository.js';
import * as studentHelpers from '../helpers/student.helper.js';
import { flatten } from 'flat';



export const addNewStudent = async (data, teacherId) => {
  const {studentData, studentInfoData} = studentHelpers.splitStudentData(data, teacherId);
  const uniqueData = studentHelpers.getUniqueStudentData(studentData);

  const student = await studentRepository.findOneByUniqueFields(uniqueData);
  if (student) throw new ConflictError('Student');

  return studentRepository.createStudentAndStudentInfo(studentData, studentInfoData);
};

export const updateStudent = async (id, data, teacherId) => {
  const studentOld = await getStudentById(id, teacherId);

  const {studentData, studentInfoData} = studentHelpers.splitStudentData(data);

  const newStudent = {...studentData, 'teacherId': studentOld.teacherId};

  const uniqueData = studentHelpers.getUniqueStudentData(newStudent);

  const student = await studentRepository.findOneByUniqueFields(uniqueData);
  if (student && student.id !== studentOld.id) throw new ConflictError('Student with this data');

  return studentRepository.updateStudentAndStudentInfo(id, studentData, studentInfoData);
};

export const getStudentById = async (id, teacherId) => {
  const student = await studentRepository.getOneWithInfo(id);
  if (!student) throw new NotFoundError('Student');


  await getStudentOfTeacherValidated(id, teacherId);

  return student;
};

export const getStudentOfTeacherValidated = async (studentId, teacherId) => {
  const student = await studentRepository.getOneByIdAndTeacher(studentId, teacherId);
  if (!student) throw new ForbiddenError('Student access denied');

  return student;
};

export const deleteStudent = async (id, teacherId) => {
  await getStudentById(id, teacherId);

  await studentRepository.deleteInstanceById(id);

  return ('success');
};

export const getStudentsForTeacher = async (teacherId) => {
  const students = await studentRepository.getManyByTeacher(teacherId);

  return students;
};