import BaseRepository from './base.repository.js';
import prisma from '../../db.js';

class BibliographyRepository extends BaseRepository {
  constructor() {
    super(prisma.bibliography);
  }

  getOneByUrl(url) {
    return prisma.bibliography.findUnique({where: {url: url}});
  }

  getOneByUrlAndTeacher(url, teacherId) {
    return prisma.bibliography.findUnique({where: {url: url, teacherId: teacherId}});
  }

  getManyByTeacher(teacherId) {
    return prisma.bibliography.findMany({where: {teacherId: teacherId}});
  }


  createBibliographyWithStudentBibliography(studentId, data) {
    return prisma.bibliography.create({
      data: {
        ...data,
        studentsBibliography: {
          create: {
            studentId: studentId
          },
        },
      },
      include: {
        studentsBibliography: true
      },
    });
  }


  // getAllUrls() {
  // return prisma.bibliography.findMany({select: {url: true}});
  //}


}

export default new BibliographyRepository();