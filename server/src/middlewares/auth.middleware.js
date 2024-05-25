
import jwt from'jsonwebtoken';
import * as teacherService from '../services/teacher.service.js';
import * as bibliographyService from '../services/bibliography.service.js';
const {JsonWebTokenError, TokenExpiredError} = jwt;



export const checkAuth = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || 'Empty').replace(/Bearer\s?/, '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decodedToken._id;
    await teacherService.getTeacherById(req.id);
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({error: 'Session expired'});
      }
      return res.status(401).json({error: 'User is unauthorized'});
    } else {
      next(error);
    }
  }
};

export const checkAccessBibliography = async (req, _res, next) => {
  try {
    const url = '/bibliography/documents' + req.url;
    await bibliographyService.getTeachersBibliographyValidated(url, req.id);
    next();
  } catch (error) {
    next(error);
  }
};

