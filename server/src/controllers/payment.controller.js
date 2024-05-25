import * as paymentService from '../services/payment.service.js';



export const getUnpaidLessonsForTeacher = async (req, res, next) => {
  try {
    const data = await paymentService.getUnpaidHistoryForTeacher(req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const data = await paymentService.updatePayment(req.params.id, req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getPaymentsForStudentForTimePeriodWithTotal  = async (req, res, next) => {
  try {
    const data = await paymentService.getPaymentsForDurationForTeachersStudent(req.query.start, req.query.end, req.params.id, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const getPaymentsForTeacherForTimePeriodWithTotal  = async (req, res, next) => {
  try {
    const data = await paymentService.getPaymentsForDurationForTeacher(req.query.start, req.query.end, req.id);
    return res.json({ data: data});
  } catch (error) {
    next(error);
  }
};