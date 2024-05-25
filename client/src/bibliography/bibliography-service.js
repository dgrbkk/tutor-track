import {server} from "../serverConn.jsx";

export const bibliographyCreationAndUpload = (pdfData, callback, errorCallback) => {

    var data = new FormData();
    for (var key in pdfData) {
        data.append(key, pdfData[key]);
    }


    server
        .post('/bibliography', data)
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

export const bibliographyCreationAndUploadForStudent = (pdfData, studentId, callback, errorCallback) => {

    var data = new FormData();
    for (var key in pdfData) {
        data.append(key, pdfData[key]);
    }


    server
        .post(`/bibliography/student/?studentId=${studentId}`, data)
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

export const bibliographyAddForStudent = (biblioId, studentId, callback, errorCallback) => {

    server
        .post(`/bibliography/student/${biblioId}/?studentId=${studentId}`)
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

export const getBibliograhiesForTeacher = (callback, errorCallback) => {

    server
        .get(`/bibliography`)
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

export const getBibliograhiesForStudent = (studentId, callback, errorCallback) => {

    server
        .get(`/bibliography/student/${studentId}`)
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

export const deleteBibliograhyForStudent = (biblioId, studentId, callback, errorCallback) => {

    server
        .delete(`/bibliography/student/${biblioId}/?studentId=${studentId}`)
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

export const deleteBibliography = (biblioId, callback, errorCallback) => {

    server
        .delete(`/bibliography/${biblioId}`)
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