import * as bibliographyService from '../services/bibliography.service.js';
import {BadRequestError} from "../helpers/httpErrors.js";
import * as lessonService from "../services/lesson.service.js";

export const createBibliographyForTeacher = async (req, res, next) => {
    try {
        const data = await bibliographyService.addNewBibliography(req.body, req.file, req.id);
        return res.json({data: data});
    } catch (error) {
        next(error);
    }
};

export const deleteBibliography = async (req, res, next) => {
    try {
        const data = await bibliographyService.deleteBibliographyForTeacher(req.id, req.params.id);
        return res.json({data: data});
    } catch (error) {
        next(error);
    }
};

export const addExistingBibliographyToStudent = async (req, res, next) => {
    try {
        const data = await bibliographyService.addBibliographyToStudent(req.query.studentId, req.params.id, req.id);
        return res.json({data: data});
    } catch (error) {
        next(error);
    }
};

export const addNewBibliographyToStudent = async (req, res, next) => {
    try {
        const data = await bibliographyService.addNewBibliographyToStudent(req.query.studentId, req.body, req.file, req.id);
        return res.json({data: data});
    } catch (error) {
        next(error);
    }
};

export const deleteBibliographyFromStudent = async (req, res, next) => {
    try {
        const data = await bibliographyService.deleteStudentsBibliography(req.id, req.params.id, req.query.studentId);
        return res.json({data: data});
    } catch (error) {
        next(error);
    }
};

export const getBibliographiesForTeacher = async (req, res, next) => {
    try {
        const data = await bibliographyService.getTeachersBibliography(req.id)
        return res.json({data: data});
    } catch (error) {
        next(error);
    }
};

export const getBibliographiesForStudent = async (req, res, next) => {
    try {
        const data = await bibliographyService.getStudentsBibliographies(req.params.id)
        return res.json({data: data});
    } catch (error) {
        next(error);
    }
};



