import {server} from "../serverConn.jsx";

export const getPaymentsForStudentForTime = (periodData, studentId, callback, errorCallback) => {
    server
        .get(`/payment/student/${studentId}/?start=${periodData.start}&end=${periodData.end}`)
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

export const getPaymentsForTeacherForTime = (periodData, callback, errorCallback) => {
    server
        .get(`/payment/?start=${periodData.start}&end=${periodData.end}`)
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

export const getDebtForTeacher = ( callback, errorCallback) => {
    server
        .get(`/payment/unpaid`)
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

export const paymentUpdate = (paymentData, callback, errorCallback) => {
    server
        .put(`/payment/${paymentData.id}`, {
            ...paymentData,
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