export const countLessonSlots = (duration, time) => {
  return Math.ceil((duration + time) / 60);
};

export const splitLessonData = (data, teacherId) => {

  const {date, duration, url, topic, grade, homework, rating, notes, studentId} = data;
  let lessonData = {date, duration, url, topic, grade, homework, rating, notes, studentId};
  lessonData = {...lessonData, 'slots': countLessonSlots(duration, date.getMinutes())};
  if (teacherId) lessonData = {...lessonData, 'teacherId' : teacherId};

  const { paymentNotes, price} = data;
  const paymentData = { paymentNotes, price};
  return {lessonData, paymentData};
};

export const getUniqueLessonData = (data) => {
  const {date, teacherId} = data;
  return {teacherId, date};
};

export const getBusySlotsForLesson = (date, slots) => {
  const busySlots = [];
  for (let i = 0; i < slots; i++) {
    busySlots.push(date.getHours() + i);
  }

  return busySlots;
};