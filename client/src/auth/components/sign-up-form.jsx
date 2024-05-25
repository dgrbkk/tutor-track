import {
    Button,
    Divider,
    Input,
    Stack,
    Typography,
    Tabs,
    Breadcrumbs,
    Link,
    Tooltip,
    CardOverflow,
    CardActions,
    Card,
    tabClasses,
    Tab,
    TabList,
    FormLabel,
    FormControl,
    Box,
    AspectRatio,
    IconButton,
    FormHelperText
} from "@mui/joy";
import {CircularProgress} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded.js";

import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useRef, useState} from 'react';
import {useFormik} from 'formik';
import {object, string} from 'yup';

import {registration} from '../auth-service.js';
import {avatarUpload} from "../auth-service.js";
import {baseUrl} from "../../serverConn.jsx";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded.js";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded.js";
import * as React from "react";

const SignUpForm = () => {
    const navigate = useNavigate();
    const inputAvatar = useRef(null)

    const signUpSchema = object({
        firstName: string().min(1, 'First name should be min 1 characters'),
        lastName: string().min(2, 'Last name should be min 2 characters'),
        phoneNumber: string().min(10).matches('', 'Wrong phone format'),
        email: string().email('Wrong email format').required('Email is required'),
        password: string()
            .matches(
                '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
                'Password should be min 8 characters and have at least 1 letter and 1 number'
            )
            .required('Password is required'),
    });

    const {handleSubmit, values, handleChange, touched, errors} = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: (payload) => {
            setShowLoading(true);
            const data = {...payload, avatarUrl: avatar}
            registration(
                data,
                () => {
                    setShowLoading(false);
                    navigate('/login');
                },
                (err) => {
                    console.log(err);
                    setError(err);
                    setShowLoading(false);
                }
            );
        },
    });

    const {firstName, lastName, phoneNumber, email, password} = values;

    const [error, setError] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [avatar, setAvatar] = useState("/uploads/default.jpg")
    const [visibility, setVisibility] = useState(false)


    const handleRegistrationSubmit = async (event) => {
        event.preventDefault();

        setError('');

        const data = new FormData(event.currentTarget);
        const payload = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            phoneNumber: data.get('phoneNumber'),
            email: data.get('email'),
            password: data.get('password'),
        };

        handleSubmit(payload);
    };

    const handleAvatarSubmit = (event) => {
        setError('')

        const avaData = new FormData();
        const file = event.currentTarget.files[0];

        avaData.append("image", file);

        avatarUpload(avaData, (res) => {
            setAvatar(res.url)
        }, (err) => {
            console.log(err)
            setError(err)
        })
    }


    return (
        <>
            <Stack
                gap={4}
                sx={{mb: 2}}
            >
                <Stack direction="row" gap={1}>
                    <Stack direction="column">
                        <Typography
                            component='h1'
                            level='h3'
                        >
                            Sign up
                        </Typography>
                        <Typography level='body-sm'>
                            Already have an account?
                            <Link
                                component={RouterLink}
                                to='/login'
                                variant='body2'
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Stack>
                    <input ref={inputAvatar} type="file" accept="image/*"
                           onChange={handleAvatarSubmit} hidden/>
                    <Stack sx={{ml: 3}} direction="column" spacing={1}>
                        <AspectRatio
                            onDoubleClick={() => {
                                setAvatar("/uploads/default.jpg")
                            }}
                            ratio="1"
                            maxHeight={200}
                            sx={{flex: 1, minWidth: 120, borderRadius: '100%'}}
                        >
                            <img
                                src={`${baseUrl}${avatar}`}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                        <Tooltip title="Click twice on avatar to delete">
                            <IconButton
                                onClick={() => inputAvatar.current.click()}
                                aria-label="upload new picture"
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                sx={{
                                    bgcolor: 'background.body',
                                    position: 'absolute',
                                    zIndex: 2,
                                    borderRadius: '50%',
                                    boxShadow: 'sm',
                                }}
                            >
                                <EditRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                gap={4}
            >
                <form onSubmit={handleRegistrationSubmit}>
                    <FormControl required>
                        <FormLabel>First Name *</FormLabel>
                        <Input
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={handleChange}
                            error={touched.firstName && Boolean(errors.firstName)}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {touched.firstName && errors.firstName}
                        </FormHelperText>
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Last Name *</FormLabel>
                        <Input
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={handleChange}
                            error={touched.lastName && Boolean(errors.lastName)}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {touched.lastName && errors.lastName}
                        </FormHelperText>
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Phone *</FormLabel>
                        <Input
                            type='text'
                            name='phoneNumber'
                            value={phoneNumber}
                            onChange={handleChange}
                            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {touched.phoneNumber && errors.phoneNumber}
                        </FormHelperText>
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Email *</FormLabel>
                        <Input
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {touched.email && errors.email}
                        </FormHelperText>
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Password *</FormLabel>
                        <Input
                            endDecorator={visibility ? <VisibilityRoundedIcon onClick={() => {setVisibility(!visibility)}}/>
                                : <VisibilityOffRoundedIcon onClick={() => {setVisibility(!visibility)}}/>}
                            type={visibility ? 'text' : 'password'}
                            name='password'
                            value={password}
                            onChange={handleChange}
                            error={touched.password && Boolean(errors.password)}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {touched.password && errors.password}
                        </FormHelperText>
                    </FormControl>
                    <Stack
                        gap={4}
                        sx={{mt: 1}}
                    >
                        {error && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    color: 'darkRed',
                                }}
                            >
                                {Array.isArray(error) ? error[0] : error}
                            </Box>
                        )}
                        <Button
                            type='submit'
                            fullWidth
                            disabled={showLoading}
                        >
                            {showLoading ? (
                                <CircularProgress
                                    color='inherit'
                                    size='1.5rem'
                                />
                            ) : (
                                'Sign up'
                            )}
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </>
    );
};

export {SignUpForm};
