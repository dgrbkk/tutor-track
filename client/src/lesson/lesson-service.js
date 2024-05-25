import {server} from "../serverConn.jsx";



export const lessonCreation = (lessonData, callback, errorCallback) => {
    server
        .post('/lesson', {
            ...lessonData,
        })
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response.data.error);
            }
        });
};

export const lessonUpdate = (lessonData, callback, errorCallback) => {
    server
        .put(`/lesson/${lessonData.id}`, {
            ...lessonData,
        })
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response.data.error);
            }
        });
};

export const lessonDelete = (lessonId, callback, errorCallback) => {
    server
        .delete(`/lesson/${lessonId}`)
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response.data.error);
            }
        });
};


export const getLessonWithPayment = (lessonId, callback, errorCallback) => {
    server
        .get(`/lesson/${lessonId}`)
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response.data.error);
            }
        });
};

export const getLessonsForTime = (periodData, callback, errorCallback) => {
    server
        .get(`/lesson/?start=${periodData.start}&end=${periodData.end}`)
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response.data.error);
            }
        });
};

export const getLessonsForStudentForTime = (periodData, studentId, callback, errorCallback) => {

    server
        .get(`/lesson/student/${studentId}/?start=${periodData.start}&end=${periodData.end}`)
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response.data.error);
            }
        });
};

export const getLessonsForTeacherForTime = (periodData, callback, errorCallback) => {

    server
        .get(`/lesson/?start=${periodData.start}&end=${periodData.end}`)
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response.data.error);
            }
        });
};