import * as paymentHelpers from '../helpers/payment.helper.js';
import paymentRepository from '../repositories/payment.repository.js';
import lessonRepository from "../repositories/lesson.repository.js";


export const updatePayment = async (paymentId, data) => {
  if (data.status) {
    return paymentRepository.updateInstanceById({
      status: data.status, paymentNotes: data.paymentNotes,
      price: data.price, time: new Date(Date.now())
    }, paymentId);
  } else {
    return paymentRepository.updateInstanceById({
      status: data.status, paymentNotes: data.paymentNotes,
      price: data.price
    }, paymentId);
  }


};
export const getUnpaidHistoryForTeacher = async (teacherId) => {
  const paymentsUnpaid = await paymentRepository.getPaymentsByStatusAndTeacherForDoneLessons(false, teacherId);
  const total = paymentHelpers.getSumFromPayments(paymentsUnpaid);

  return {paymentsUnpaid, total};
};

export const getPaymentsForDurationForTeachersStudent = async (start, end, studentId, teacherId) => {
   const payments = await paymentRepository.getPaymentsByTeacherAndStudentAndDateRange(teacherId, studentId, start, end);
   const totals = paymentHelpers.getPaymentsTotal(payments);

  return {payments, totals};
};

export const getPaymentsForDurationForTeacher = async (start, end, teacherId) => {
  const payments = await paymentRepository.getPaymentsByTeacherAndDateRange(teacherId, start, end);
  const totals = paymentHelpers.getPaymentsTotal(payments);

  return {payments, totals};
};

