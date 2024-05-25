import {
  Button,
  Input,
  Stack,
  Typography,
  Link,
  FormLabel,
  FormControl,
  Box,
    FormHelperText
} from "@mui/joy";
import {CircularProgress} from "@mui/material";

import {Link as RouterLink, useNavigate, useOutletContext} from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { login } from '../auth-service.js';
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded.js";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded.js";
import * as React from "react";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    user: [user, setUser],
    students: [students, setStudents],
  } = useOutletContext();

  const signInSchema = object({
    email: string().email('Wrong email format').required('Email is required'),
    password: string()
      .matches(
        '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
        'Password should be min 8 characters and have at least 1 letter and 1 number'
      )
      .required('Password is required'),
  });

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: (payload) => {
      setIsLoading(true);

      login(
        payload,
        (res) => {
          setUser(res)
          setIsLoading(false);
          navigate('/schedule');
        },
        (err) => {
          console.log(err);
          setError(err);
          setIsLoading(false);
        }
      );
    },
  });

  const { email, password } = values;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibility, setVisibility] = useState(false)


  const handleLoginSubmit = (event) => {
    event.preventDefault();

    setError('');

    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };

    handleSubmit(payload);
  };

  return (
    <>
      <Stack
        gap={4}
        sx={{ mb: 2 }}
      >
        <Stack gap={1}>
          <Typography
            component='h1'
            level='h3'
          >
            Sign in
          </Typography>
          <Typography level='body-sm'>
            Don&apos;t have an account?
            <Link
              component={RouterLink}
              to='/register'
              variant='body2'
            >
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Stack
        gap={4}
        sx={{ mt: 2 }}
      >
        <form onSubmit={handleLoginSubmit}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
            />
            <FormHelperText sx={{ color: 'red' }}>
              {touched.email && errors.email}
            </FormHelperText>
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input
                endDecorator={visibility ? <VisibilityRoundedIcon onClick={() => {setVisibility(!visibility)}}/>
                    : <VisibilityOffRoundedIcon onClick={() => {setVisibility(!visibility)}}/>}
                type={visibility ? 'text' : 'password'}
              name='password'
              id='password'
              value={password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
            />
            <FormHelperText sx={{ color: 'red' }}>
              {touched.password && errors.password}
            </FormHelperText>
          </FormControl>
          <Stack
            gap={4}
            sx={{ mt: 1 }}
          >
            {error && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'darkRed',
                }}
              >
                {Array.isArray(error) ? error[0] : error}
              </Box>
            )}
            <Button
              type='submit'
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  color='inherit'
                  size='1.5rem'
                />
              ) : (
                'Sign in'
              )}
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export { SignInForm };

