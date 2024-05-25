import BaseRepository from './base.repository.js';
import prisma from '../../db.js';

class StudentsbibliographyRepository extends BaseRepository {
  constructor() {
    super(prisma.studentsBibliography);
  }

  getOneByStudentAndBibliography(data) {
    return prisma.studentsBibliography.findUnique({where: {studentId_bibliographyId: data}});
  }

  getManyByStudent(studentId) {
    return prisma.studentsBibliography.findMany({where: {studentId: studentId}, include: {bibliography: true}});
  }

  deleteInstanceById(biblioId, studentId) {
    return prisma.studentsBibliography.delete({where: {studentId_bibliographyId: {studentId: studentId, bibliographyId: biblioId}}})
  }
}

export default new StudentsbibliographyRepository();