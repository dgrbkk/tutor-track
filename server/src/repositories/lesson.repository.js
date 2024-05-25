import BaseRepository from './base.repository.js';
import prisma from '../../db.js';

class LessonRepository extends BaseRepository {
  constructor() {
    super(prisma.lesson);
  }

  createLessonAndPayment(lessonData, paymentData) {
    return prisma.lesson.create({
      data: {
        ...lessonData,
        payment: {
          create: {
            ...paymentData
          },
        },
      },
      include: {
        payment: true,
        student: true
      },
    });
  }

  updateLessonAndPayment(lessonId, lessonData, paymentData) {
    return prisma.lesson.update({
      where: {
        id: lessonId
      },
      data: {
        ...lessonData,
        payment: {
          update: {
            ...paymentData
          },
        },
      },
      include: {
        payment: true,
        student: true
      },
    });
  }

  findOneByUniqueFields(data) {
    return prisma.lesson.findUnique({where: {teacherId_date: data}});
  }

  getOneByIdAndTeacher(lessonId, teacherId) {
    return prisma.lesson.findUnique({where: {id: lessonId, teacherId: teacherId}});
  }

  getLessonsByTeacherAndDateRange(teacherId, beginDate, endDate) {

    return prisma.lesson.findMany({
      where: {
        teacherId: teacherId,
        date: {
          gte: beginDate,
          lte: endDate
        },
      }, include: {payment: true, student: true}
    });
  }

  getLessonsByTeacherAndStudentAndDateRange(teacherId, studentId, beginDate, endDate) {

    return prisma.lesson.findMany({
      where: {
        teacherId: teacherId,
        studentId: studentId,
        date: {
          gte: beginDate,
          lte: endDate
        },
      }, include: {payment: true, student: true}
    });
  }

  getLessonsByTeacherAndDateRange(teacherId, beginDate, endDate) {

    return prisma.lesson.findMany({
      where: {
        teacherId: teacherId,
        date: {
          gte: beginDate,
          lte: endDate
        },
      }, include: {payment: true, student: true}
    });
  }

  getOneByIdWithPaymentAndStudent(lessonId) {
    return prisma.lesson.findUnique({where: {id: lessonId}, include: {payment: true, student: true}});
  }

  updateInstanceById(data, id) {
    return prisma.lesson.update({where: {id: id}, data: data, include: {payment: true, student: true}});
  }

  createInstance(data) {
    return prisma.lesson.create({data:data, include: {student: true, payment: true}})
  }
}

export default new LessonRepository();