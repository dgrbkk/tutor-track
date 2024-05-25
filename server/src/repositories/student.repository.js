import prisma from '../../db.js';
import BaseRepository from './base.repository.js';

class StudentRepository extends BaseRepository {

    constructor() {
        super(prisma.student);
    }

    createStudentAndStudentInfo(studentData, studentInfoData) {
        return prisma.student.create({
            data: {
                ...studentData,
                studentInfo: {
                    create: {
                        ...studentInfoData
                    },
                },
            },
            include: {
                studentInfo: true,
                Teacher: true,
            },
        });
    }

    //include what??

    updateStudentAndStudentInfo(studentId, studentData, studentInfoData) {
        return prisma.student.update({
            where: {
                id: studentId
            },
            data: {
                ...studentData,
                studentInfo: {
                    update: {
                        ...studentInfoData
                    },
                },
            },
            include: {
                studentInfo: true
            },
        });
    }

    findOneByUniqueFields(data) {
        return prisma.student.findUnique({where: {firstName_lastName_email_phoneNumber_teacherId: data}});
    }

    getOneByIdAndTeacher(studentId, teacherId) {
        return prisma.student.findUnique({where: {id: studentId, teacherId: teacherId}});
    }

    getManyByTeacher(teacherId) {
        return prisma.student.findMany({where: {teacherId: teacherId}});
    }

    getOneWithInfo(id) {
        return prisma.student.findUnique({
            where: {id: id},
            include: {studentInfo: true}
        });
    }
}

export default new StudentRepository();