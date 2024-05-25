import * as lessonHelpers from '../helpers/lesson.helper.js';
import lessonRepository from '../repositories/lesson.repository.js';
import {ConflictError, ForbiddenError, NotFoundError} from '../helpers/httpErrors.js';
import * as studentService from './student.service.js';
import {countLessonSlots} from '../helpers/lesson.helper.js';



export const addNewLesson = async (data, teacherId) => {

  const {lessonData, paymentData} = lessonHelpers.splitLessonData(data, teacherId);

  const slots = countLessonSlots(data.duration, data.date.getMinutes());

  await checkLessonTime(lessonData.date, slots, teacherId);

  await studentService.getStudentById(data.studentId, teacherId);

  const uniqueData = lessonHelpers.getUniqueLessonData(lessonData);

  const lesson = await lessonRepository.findOneByUniqueFields(uniqueData);
  if (lesson) throw new ConflictError('Lesson on this time');

  return lessonRepository.createLessonAndPayment(lessonData, paymentData);
};


export const updateLesson = async (lessonId, data, teacherId) => {
  const lessonOld = await getLessonById(lessonId, teacherId);

  const slots = countLessonSlots(data.duration, data.date.getMinutes());

  await checkLessonTime(data.date, slots, teacherId, true);

  const lesson = await lessonRepository.findOneByUniqueFields({teacherId: teacherId, date: data.date});
  if (lesson && lesson.id !== lessonOld.id) throw new ConflictError('Lesson on this time');

  return lessonRepository.updateInstanceById({
    duration: data.duration, slots: slots, topic: data.topic,
    grade: data.grade, status: data.status, homework: data.homework, homeworkCheck: data.homeworkCheck,
    notes: data.notes, rating: data.rating, url: data.url
  }, lessonId);
};

export const getLessonById = async (lessonId, teacherId) => {

  const lesson = await lessonRepository.getOneByIdWithPaymentAndStudent(lessonId);
  if (!lesson) throw new NotFoundError('Lesson');

  await getLessonOfTeacherValidated(lessonId, teacherId);

  return lesson;
};

export const getLessonOfTeacherValidated = async (lessonId, teacherId) => {
  const lesson = await lessonRepository.getOneByIdAndTeacher(lessonId, teacherId);
  if (!lesson) throw new ForbiddenError('Lesson access denied');

  return lesson;
};

export const deleteLesson = async (id, teacherId) => {
  await getLessonById(id, teacherId);

  await lessonRepository.deleteInstanceById(id);

  return ('success');
};

export const getBusySlotsForDayForTeacher = async (date, teacherId) => {
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);
  const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 22, 0, 0);
  const lessonsOfTheDay = await lessonRepository.getLessonsByTeacherAndDateRange(teacherId, dayStart, dayEnd);

  const busySlots = [];
  for (let l of lessonsOfTheDay) {
    busySlots.push(lessonHelpers.getBusySlotsForLesson(l.date, l.slots));
  }

  return busySlots.flat(1);
};

export const getLessonsForDurationForTeacher = async (start, end, teacherId) => {

  return await lessonRepository.getLessonsByTeacherAndDateRange(teacherId, start, end);
};

export const getLessonsForDurationForTeachersStudent = async (start, end, studentId, teacherId) => {


  return await lessonRepository.getLessonsByTeacherAndStudentAndDateRange(teacherId, studentId, start, end);
};



export const checkLessonTime = async (date, slots, teacherId, lessonUpd) => {
  const lessonSlots = await lessonHelpers.getBusySlotsForLesson(date, slots);
  const busySlots = await getBusySlotsForDayForTeacher(date, teacherId);

  console.log(lessonSlots, busySlots);

  const timeAvailable = lessonSlots.filter(x => busySlots.includes(x)).length;
  if (timeAvailable > 0 && !lessonUpd) throw new ConflictError('Lesson on this time');

  return timeAvailable > 0;
};

