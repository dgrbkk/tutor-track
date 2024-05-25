import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";

import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Link from "@mui/joy/Link";
import {Link as RouterLink, useNavigate, useOutletContext} from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {useCallback, useState} from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded.js";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded.js";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, {tabClasses} from "@mui/joy/Tab";
import Textarea from '@mui/joy/Textarea';
import {object, string} from "yup";
import {useFormik} from "formik";
import {getTeachersStudents, studentCreation} from "../student-service.js";
import FormHelperText from "@mui/joy/FormHelperText";
import {CircularProgress} from "@mui/material";


const StudentForm = () => {
    const navigate = useNavigate();
    const {
        user: [user, setUser],
        students: [students, setStudents],
    } = useOutletContext();

    const createStudentSchema = object({
        firstName: string().min(1, 'First name should be min 1 characters'),
        lastName: string().min(2, 'Last name should be min 2 characters'),
        phoneNumber: string().min(10).matches('', 'Wrong phone format'),
        parentsPhoneNumber: string().min(10).matches('', 'Wrong phone format').optional(),
        email: string().email('Wrong email format').required('Email is required'),
        request: string().min(2, 'Request should be min 2 characters'),
        availableTime: string().min(4, 'Available time should be min 4 characters').optional(),
        characterTraits: string().min(5, 'Character traits should be min 5 characters').optional(),
        knowledgeLeve: string().min(2, 'Knowledge level should be min 2 characters'),
        notes: string().min(5, 'Notes traits should be min 5 characters').optional()
    });

    const {handleSubmit, values, handleChange, errors, touched} = useFormik({
        initialValues: {
            email: '',
            phoneNumber: '',
            parentsPhoneNumber: '',
            request: '',
            availableTime: '',
            characterTraits: '',
            knowledgeLevel: '',
            notes: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: createStudentSchema,
        onSubmit: (payload) => {
            setIsLoading(true);

            studentCreation(
                payload,
                (res) => {
                    setIsLoading(false);
                    getStudents()
                    navigate(`/student/${res.data?.id}`, {
                        state: {
                            student: res.data
                        }
                    })
                },
                (err) => {
                    console.log(err);
                    setError(err);
                    setIsLoading(false);
                }
            );
        },
    });

    const {
        email, firstName, lastName, availableTime, phoneNumber, parentsPhoneNumber, characterTraits, knowledgeLevel,
        notes, request
    } = values;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreateStudentSubmit = (event) => {
        event.preventDefault();

        setError('');

        const data = new FormData(event.currentTarget);
        const payload = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            phoneNumber: data.get('phoneNumber'),
            email: data.get('email'),
            password: data.get('password'),
            parentsPhoneNumber: data.get("parentsPhoneNumber"),
            request: data.get('request'),
            availableTime: data.get("availableTime"),
            characterTraits: data.get('characterTraits'),
            knowledgeLevel: data.get('knowledgeLevel'),
            notes: data.get('notes')
        };

        handleSubmit(payload);
    };

    const getStudents = () => {
        getTeachersStudents((res) => {
                setStudents(res.data)
            },
            (err) => {
                console.log(err);
                setError(err);
            }
        )
    }

    const getStudentForm = () => {
        return <Box
            sx={(theme) => ({
                width: {xs: '100%', md: '50vw'},
                transition: 'width var(--Transition-duration)',
                transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255 255 255)',
                [theme.getColorSchemeSelector('dark')]: {
                    backgroundColor: 'rgba(19 19 24 / 0.4)',
                },
            })}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100dvh',
                    width: '100%',
                    px: 2,
                }}
            >
                <Box
                    component="main"
                    sx={{
                        my: 'auto',
                        py: 2,
                        pb: 5,
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 700,
                        maxWidth: '100%',
                        mx: 'auto',
                        borderRadius: 'sm',
                        '& form': {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        },
                        [`& .MuiFormLabel-asterisk`]: {
                            visibility: 'hidden',
                        },
                    }}
                >
                    <Stack gap={4} sx={{mb: 2}}>
                        <Stack gap={1}>
                            <Typography component="h1" level="h3">
                                Add new student
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack gap={4} sx={{mt: 2}}>
                        <form
                            onSubmit={handleCreateStudentSubmit}
                        >
                            <Box sx={{display: 'flex', gap: 2}}>
                                <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>First Name *</FormLabel>
                                    <Input type="text" name="firstName"
                                           value={firstName}
                                           onChange={handleChange}
                                           error={touched.firstName && Boolean(errors.firstName)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.firstName && errors.firstName}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Last Name *</FormLabel>
                                    <Input type="text" name="lastName" value={lastName}
                                           onChange={handleChange}
                                           error={touched.lastName && Boolean(errors.lastName)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.lastName && errors.lastName}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <Box sx={{display: 'flex', gap: 2}}>
                                <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Phone *</FormLabel>
                                    <Input type="text" name="phoneNumber" value={phoneNumber}
                                           onChange={handleChange}
                                           error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.phoneNumber && errors.phoneNumber}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl sx={{width: '50%'}}>
                                    <FormLabel>Additional phone </FormLabel>
                                    <Input type="text" name="parentsPhoneNumber"
                                           value={parentsPhoneNumber}
                                           onChange={handleChange}
                                           error={touched.parentsPhoneNumber && Boolean(errors.parentsPhoneNumber)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.parentsPhoneNumber && errors.parentsPhoneNumber}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <Box sx={{display: 'flex', gap: 2}}>
                                <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Email *</FormLabel>
                                    <Input type="email" name="email"
                                           value={email}
                                           onChange={handleChange}
                                           error={touched.email && Boolean(errors.email)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.email && errors.email}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl sx={{width: '50%'}}>
                                    <FormLabel>Available time</FormLabel>
                                    <Input type="text" name="availableTime"
                                           value={availableTime}
                                           onChange={handleChange}
                                           error={touched.availableTime && Boolean(errors.availableTime)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.availableTime && errors.availableTime}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <Box sx={{display: 'flex', gap: 2}}>
                                <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Request *</FormLabel>
                                    <Input type="text" name="request"
                                           value={request}
                                           onChange={handleChange}
                                           error={touched.request && Boolean(errors.request)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.request && errors.request}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Knowledge level *</FormLabel>
                                    <Input type="text" name="knowledgeLevel"
                                           value={knowledgeLevel}
                                           onChange={handleChange}
                                           error={touched.knowledgeLevel && Boolean(errors.knowledgeLevel)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.knowledgeLevel && errors.knowledgeLevel}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <FormControl>
                                <FormLabel>Character traits</FormLabel>
                                <Textarea minRows={1} type="text" name="characterTraits"
                                          value={characterTraits}
                                          onChange={handleChange}
                                          error={touched.characterTraits && Boolean(errors.characterTraits)}
                                />
                                <FormHelperText sx={{color: 'red'}}>
                                    {touched.characterTraits && errors.characterTraits}
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Notes</FormLabel>
                                <Textarea minRows={1} type="text" name="notes"
                                          value={notes}
                                          onChange={handleChange}
                                          error={touched.notes && Boolean(errors.notes)}
                                />
                                <FormHelperText sx={{color: 'red'}}>
                                    {touched.notes && errors.notes}
                                </FormHelperText>
                            </FormControl>
                            <Stack gap={4} sx={{mt: 1}}>
                                {error && <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        color: "darkRed"
                                    }}
                                >
                                    {Array.isArray(error) ? error[0] : error}
                                </Box>}
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
                                        'Create'
                                    )}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Box>
        </Box>
    }

    return <>
        <Stack
            direction="row"
            spacing={3}
            sx={{display: {xs: 'none', md: 'flex'}, my: 1}}
        >
            {getStudentForm()}
        </Stack>
        <Stack
            direction="column"
            spacing={2}
            sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
        >
            {getStudentForm()}
        </Stack>
    </>
}

export {StudentForm}