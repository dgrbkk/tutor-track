import prisma from '../../db.js';
import BaseRepository from './base.repository.js';

class TeacherRepository extends BaseRepository {
  constructor() {
    super(prisma.teacher);
  }

  getStudentsByTeacherId(id) {
    return prisma.student.findMany({where: {teacherId: id}});
  }

  getOneByEmail(email) {
    return prisma.teacher.findUnique({where: {email: email}});
  }

  getOneByPhone(phone) {
    return prisma.teacher.findUnique({where: {phoneNumber: phone}});
  }
}

export default new TeacherRepository();
