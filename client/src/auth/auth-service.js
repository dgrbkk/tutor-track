import { server } from '../serverConn.jsx';

export const registration = (registrationData, callback, errorCallback) => {
  server
    .post('/auth/register', {
      ...registrationData,
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

export const login = (payload, callback, errorCallback) => {
  server
    .post('/auth/login', {
      ...payload,
    })
    .then((res) => {
      if (callback) {
        callback(res.data);
        window.localStorage.setItem('token', res.data.token);
      }
    })
    .catch((err) => {
      if (errorCallback) {
        errorCallback(err.response.data.error);
      }
    });
};

export const avatarUpload = (avatarData, callback, errorCallback) => {

  server
      .post('/upload', avatarData)
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

export const getTeacherInfo = (callback, errorCallback) => {

  server
      .get('/teacher')
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
export const teacherUpdate = (teacherData, callback, errorCallback) => {
    server
        .put(`/teacher`, {
            ...teacherData,
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
