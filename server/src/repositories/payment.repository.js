import BaseRepository from './base.repository.js';
import prisma from '../../db.js';

class PaymentRepository extends BaseRepository {
    constructor() {
        super(prisma.payment);
    }


    getPaymentsByStatusAndTeacherForDoneLessons(status, teacherId) {
        return prisma.payment.findMany({
            where: {
                status: status,
                lesson: {
                    teacherId: teacherId,
                    status: true
                },
            },
            include: {
                lesson: {
                    select: {
                        date: true,
                        student: true,
                        status: true
                    }
                }
            }
        });
    }

    getPaymentsByTeacherAndStudentAndDateRange(teacherId, studentId, beginDate, endDate) {

        return prisma.payment.findMany({
            where: {
                lesson: {
                    teacherId: teacherId,
                    studentId: studentId,
                    date: {
                        gte: beginDate,
                        lte: endDate
                    },
                }
            }
        });
    }

    getPaymentsByTeacherAndDateRange(teacherId, beginDate, endDate) {

        return prisma.payment.findMany({
            where: {
                lesson: {
                    teacherId: teacherId,
                    date: {
                        gte: beginDate,
                        lte: endDate
                    },
                }
            }, include: {lesson: {select: {student: true}}}
        });
    }

}


export default new PaymentRepository();