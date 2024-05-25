import {server} from "../serverConn.jsx";

export const studentCreation = (studentData, callback, errorCallback) => {
    server
        .post('/student', {
            ...studentData,
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

export const studentUpdate = (studentData, callback, errorCallback) => {

    server
        .put(`/student/${studentData.studentId}`, {
            ...studentData,
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

export const studentDelete = (studentId, callback, errorCallback) => {

    server
        .delete(`/student/${studentId}`)
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
export const getTeachersStudents = (callback, errorCallback) => {
    server
        .get('/student/all')
        .then((res) => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch((err) => {
            if (errorCallback) {
                errorCallback(err.response?.data.error);
            }
        });
};

export const getStudentWithinfo = (studentId, callback, errorCallback) => {
    server
        .get(`/student/${studentId}`)
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

