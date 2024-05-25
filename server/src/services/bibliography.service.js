import bibliographyRepository from '../repositories/bibliography.repository.js';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '../helpers/httpErrors.js';
import studentsbibliographyRepository from '../repositories/studentsbibliography.repository.js';
import * as studentService from '../services/student.service.js';



export const addNewBibliography = async (data, file, teacherId) => {
  if (!file) throw new BadRequestError('Upload the file!');

  const biblio = await bibliographyRepository.getOneByUrl(`/bibliography/documents/${file.originalname}`);
  if (biblio) throw new ConflictError('Bibliography');

  return await bibliographyRepository.createInstance({
    name: data.name,
    author: data.author,
    url: `/bibliography/documents/${file.originalname}`,
    teacherId: teacherId
  });
};


export const getBibliographyByUrl = async (url) => {
  const biblio = await bibliographyRepository.getOneByUrl(url);
  if (!biblio) throw new NotFoundError('Bibliography');

  return biblio;
};

export const getBibliographyById = async (id) => {
  const biblio = await bibliographyRepository.getOne(id);
  if (!biblio) throw new NotFoundError('Bibliography');

  return biblio;
};

export const deleteBibliography = async (id) => {
  await getBibliographyById(id);
  await bibliographyRepository.deleteInstanceById(id);

  return ('success');
};

export const getTeachersBibliographyValidated = async (url, teacherId) => {
  const biblio = await bibliographyRepository.getOneByUrlAndTeacher(url, teacherId);
  if (!biblio) throw new ForbiddenError('Bibliography access denied');

  return (biblio);
};

export const getStudentsBibliography = async (studentId, biblioId) => {
  const studentsBiblio =
      await studentsbibliographyRepository.getOneByStudentAndBibliography({studentId: studentId, bibliographyId: biblioId});
  if (!studentsBiblio) throw new NotFoundError('Students bibliography');

  return (studentsBiblio);
};

export const addBibliographyToStudent = async (studentId, biblioId, teacherId) => {
  console.log(studentId, biblioId, teacherId)
  const biblio =
      await studentsbibliographyRepository.getOneByStudentAndBibliography({studentId: studentId, bibliographyId: biblioId});
  if (biblio) throw new ConflictError('Students bibliography');

  await studentService.getStudentById(studentId, teacherId);

  return await studentsbibliographyRepository.createInstance({
    studentId: studentId,
    bibliographyId: biblioId
  });
};

export const deleteBibliographyForTeacher = async (teacherId, biblioId) => {

  const biblio = await getBibliographyById(biblioId);
  if (biblio && biblio.teacherId !== teacherId) throw new ForbiddenError('Bibliography access denied');

  await bibliographyRepository.deleteInstanceById(biblioId);

  return ('success');
};

export const addNewBibliographyToStudent = async (studentId, data, file, teacherId) => {
  await studentService.getStudentById(studentId, teacherId);

  if (!file) throw new BadRequestError('Upload the file!');

  const biblio = await bibliographyRepository.getOneByUrl(`/bibliography/documents/${file.originalname}`);
  if (biblio) throw new ConflictError('Bibliography');


  return bibliographyRepository.createBibliographyWithStudentBibliography(studentId, {
    name: data.name,
    author: data.author,
    url: `/documents/${file.originalname}`,
    teacherId: teacherId
  });

};

export const deleteStudentsBibliography = async (teacherId, biblioId, studentId) => {
  await studentService.getStudentById(studentId, teacherId);

  await getStudentsBibliography(studentId, biblioId);

  await studentsbibliographyRepository.deleteInstanceById(biblioId, studentId);

  return ('success');
};

export const getTeachersBibliography = async (teachertId) => {
  return await bibliographyRepository.getManyByTeacher(teachertId);
};


export const getStudentsBibliographies = async studentId => {
  return await studentsbibliographyRepository.getManyByStudent(studentId);
};