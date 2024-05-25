import * as authService from '../services/auth.service.js';



export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const registration = async (req, res, next) => {
  try {
    const data = await authService.registration(req.body);
    res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const data = await authService.changePassword(req.id, req.body);
    res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

//?? try with full account
export const deleteAccount = async (req, res, next) => {
  try {
    const data = await authService.deleteAccount(req.id);
    res.json({ data: data});
  } catch (error) {
    next(error);
  }
};

export const bred = async (req, res, next) => {
  try {
    //console.log(req.body, req.file);
    res.json({ data: "dd"});
  } catch (error) {
    next(error);
  }
};