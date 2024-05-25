import * as teacherService from './teacher.service.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {ConflictError, ForbiddenError} from '../helpers/httpErrors.js';
import teacherRepository from '../repositories/teacher.repository.js';
import * as authHelpers from '../helpers/auth.helper.js';

export const login = async (data) => {
  const user = await teacherService.getTeacherByEmail(data.email);

  await checkPassword(data.password, user);

  const token = jwt.sign({
    _id: user.id,
    email: user.email
  }
  , process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // eslint-disable-next-line no-unused-vars
  const {password, ...userData} = user;

  return ({data: userData, token: token});
};


export const checkPassword = async (password, teacher) => {
  const validPassword = await bcrypt.compare(password, teacher.password);

  if (!validPassword) {
    throw new ForbiddenError('Wrong password');
  }
};

export const registration = async (data) => {
  const teacherE = await teacherRepository.getOneByEmail(data.email);
  if (teacherE) throw new ConflictError('Try another email, this one');
  const teacherP = await teacherRepository.getOneByPhone(data.phoneNumber);
  if (teacherP) throw new ConflictError('Try another phone, this one');

  const passwordHash = await authHelpers.hashPassword(data.password);

  const user = {...data, 'password': passwordHash};

  // eslint-disable-next-line no-unused-vars
  const {password, ...teacher} = await teacherRepository.createInstance(user);

  return (teacher);
};

export const changePassword = async (id, data) => {
  const user = await teacherService.getTeacherById(id);

  await checkPassword(data.oldPassword, user);

  const passwordHash = await authHelpers.hashPassword(data.password);

  await teacherRepository.updateInstanceById({password: passwordHash}, id);
  // eslint-disable-next-line no-unused-vars
  const {password, ...userData} = user;

  return (userData);
};

export const deleteAccount = async (id) => {
  await teacherService.getTeacherById(id);
  await teacherRepository.deleteInstanceById(id);

  return ('success');
};


