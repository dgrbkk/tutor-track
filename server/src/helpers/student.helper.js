export const splitStudentData = (data, teacherId) => {
  const {firstName,lastName,email,phoneNumber,parentsPhoneNumber} = data;
  let studentData = {firstName,lastName,email,phoneNumber,parentsPhoneNumber};
  if (teacherId) studentData = {...studentData, 'teacherId' : teacherId};

  const { request, availableTime,characterTraits, knowledgeLevel,notes} = data;
  const studentInfoData = { request, availableTime,characterTraits, knowledgeLevel,notes};

  return {studentData, studentInfoData};
};

export const getUniqueStudentData = (data) => {
  const {firstName,lastName,email,phoneNumber, teacherId} = data;
  return {firstName, lastName, email, phoneNumber, teacherId};
};

