import {body, query} from 'express-validator';
import {BadRequestError} from '../helpers/httpErrors.js';


export const registrationValidator = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Password should be min 8 characters and have at least 1 letter and 1 number').matches('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
  body('firstName', 'First name should be min 1 characters').isLength({min: 1}),
  body('lastName', 'Last name should be min 2 characters').isLength({min: 2}),
  body('phoneNumber', 'Wrong phone format').isLength({min: 10}).isMobilePhone('any'),
  body('avatarUrl').optional(),
];

export const loginValidator = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Password should be min 8 characters and have at least 1 letter and 1 number').matches('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
];

export const passwordValidator = [
  body('password', 'Password should be min 8 characters and have at least 1 letter and 1 number').matches('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
];

export const profileUpdateValidator = [
  body('firstName', 'First name should be min 1 characters').isLength({min: 1}),
  body('lastName', 'Last name should be min 2 characters').isLength({min: 2}),
  body('phoneNumber', 'Wrong phone format').isLength({min: 10}).isMobilePhone('any'),
  body('avatarUrl').optional(),
];

export const bibliographyValidator = [
  body('name', 'Name should be min 2 characters').isLength({min: 2}),
  body('author', 'Author name should be min 2 characters').isLength({min: 2}).optional({checkFalsy: true})
];

export const studentValidator = [
  body('email', 'Wrong email format').isEmail(),
  body('firstName', 'First name should be min 1 characters').isLength({min: 1}),
  body('lastName', 'Last name should be min 2 characters').isLength({min: 2}),
  body('phoneNumber', 'Wrong phone format').isLength({min: 10}).isMobilePhone('any'),
  body('parentsPhoneNumber', 'Wrong phone format').isLength({min: 10}).isMobilePhone('any').optional({checkFalsy: true}),
  body('request', 'Request should be min 2 characters').isLength({min: 2}),
  body('availableTime', 'Available time should be min 4 characters').isLength({min: 4}).optional({checkFalsy: true}),
  body('characterTraits', 'Character traits should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('knowledgeLevel', ' Knowledge level should be min 2 characters').isLength({min: 2}),
  body('notes', 'Notes should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
];


export const lessonValidator = [
  body('duration', 'Duration should be > 30').isLength({min: 0}).isNumeric().toInt(),
  body('url').optional(),
  body('topic', 'Topic should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('homework', 'Homework should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('grade', 'Grade should be min 1 characters').isLength({min: 1}).optional({checkFalsy: true}),
  body('notes', 'Notes should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('paymentNotes', 'Payment notes should be min 2 characters').isLength({min: 2}).optional({checkFalsy: true}),
  body('price', 'Price should be > 0 ').isFloat({min: 1}).toInt(),
  body('studentId', 'Select student').notEmpty(),
];

export const lessonUpdateValidator = [
  body('duration', 'Duration should be > 30').isLength({min: 0}).isNumeric().toInt(),
  body('url').optional(),
  body('status').isBoolean().notEmpty(),
  body('rating', 'Rating must be 1-10').isFloat({min: 1, max: 10}).toInt().optional({checkFalsy: true}),
  body('topic', 'Topic should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('homework', 'Homework should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('grade', 'Grade should be min 1 characters').isLength({min: 1}).optional({checkFalsy: true}),
  body('notes', 'Notes should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('paymentNotes', 'Payment notes should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
  body('studentId', 'Select student').notEmpty(),
];

export const paymentUpdateValidator = [
  body('price', 'Price should be > 0 ').isNumeric({min: 1}).toInt(),
  body('status').isBoolean().notEmpty(),
  body('paymentNotes', 'Payment notes should be min 5 characters').isLength({min: 5}).optional({checkFalsy: true}),
];

export const dateValidator = [
  body('date', 'Wrong lesson date').notEmpty().isISO8601().toDate().custom((startDate, {req}) => {
    if (req.body.date.getHours() < 7 || req.body.date.getHours() > 22) {
      throw new Error('Lesson date must be between 7-22 hours');
    }
    return true;
  })
];

export const periodValidator = [
  query('start', 'Wrong start').notEmpty().isISO8601().toDate(),
  query('end', 'Wrong end').notEmpty().isISO8601().toDate().custom((endHour, {req}) => {
    if (req.body.start >= req.body.end) {
      throw new BadRequestError('Start date >= end date');
    }
    return true;
  }).notEmpty(),
];