import {
    Button,
    Input,
    Stack,
    Typography,
    FormLabel,
    FormControl,
    Box,
    Autocomplete,
    FormHelperText,
    Textarea, AutocompleteOption,
} from "@mui/joy";
import {CircularProgress} from "@mui/material";

import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";

import {number, object, string} from "yup";
import {date as DateValidator} from "yup";
import {useFormik} from "formik";

import {getTeachersStudents} from "../../student/student-service.js";
import {lessonCreation} from "../lesson-service.js";


const LessonForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        user: [user, setUser],
        students: [students, setStudents],
    } = useOutletContext();

    const createLessonSchema = object({
        duration: number().min(30, 'Duration should be > 30'),
        url: string().min(5, 'Url should be min 5 characters').optional(),
        topic: string().min(5, 'Topic should be min 5 characters').optional(),
        homework: string().min(5, 'Homework should be min 5 characters').optional(),
        grade: string().min(1, 'Grade should be min 1 characters').optional(),
        paymentNotes: string().min(2, 'Payment notes should be min 2 characters').optional(),
        notes: string().min(5, 'Notes should be min 5 characters').optional(),
        price: number().min(1, 'Price should be > 0'),
        date: DateValidator(),
    });

    const {handleSubmit, values, handleChange, errors, touched} = useFormik({
        initialValues: {
            duration: '60',
            url: '',
            topic: '',
            homework: '',
            grade: '',
            paymentNotes: '',
            notes: '',
            price: '',
            date: ''
        },
        validationSchema: createLessonSchema,
        onSubmit: (payload) => {
            setIsLoading(true);
            const data = {
                ...payload,
                studentId: lessonStudent?.id,
                date: dateNew ? dateNew : payload.date,
                duration: durationNew ? durationNew : payload.duration,
                price: priceNew ? priceNew : payload.price,
                url: urlNew ? urlNew : payload.url
            }
            lessonCreation(
                data,
                (res) => {
                    setIsLoading(false);
                    navigate(`/lesson/${res.data?.id}`, {
                        state: {
                            lesson: res.data
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
        homework, notes, paymentNotes, topic, grade, duration, price, url, date
    } = values;

    const [isLoading, setIsLoading] = useState(false);
    const [dateNew, setDateNew] = useState(location.state?.date?.slice(0, -1))
    const [priceNew, setPriceNew] = useState(location.state?.price)
    const [durationNew, setDurationNew] = useState(location.state?.duration)
    const [urlNew, setUrlNew] = useState(location.state?.url)
    const [error, setError] = useState('');
    const [lessonStudent, setLessonStudent] = useState(location.state?.student);


    const handleCreateLessonSubmit = (event) => {
        event.preventDefault();

        setError('');

        const data = new FormData(event.currentTarget);

        const payload = {
            homework: data.get('homework'),
            url: data.get('url'),
            duration: data.get('duration'),
            paymentNotes: data.get('paymentNotes'),
            price: data.get('price'),
            topic: data.get("topic"),
            grade: data.get("grade"),
            notes: data.get('notes'),
            date: data.get('date'),
        };
        console.log(payload)
        handleSubmit(payload);
    };

    const getLessonForm = () => {
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
                                Add new lesson
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack gap={4} sx={{mt: 2}}>
                        <form
                            onSubmit={handleCreateLessonSubmit}
                        >
                            <FormControl required
                            >
                                <FormLabel>Student *</FormLabel>
                                <Autocomplete
                                    size="sm"
                                    autoHighlight
                                    name={"student"}
                                    isOptionEqualToValue={(option, value) => option.code === value.code}
                                    value={lessonStudent}
                                    options={students}
                                    onChange={(event, newValue) => {
                                        setLessonStudent(newValue)
                                    }}
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName} `}
                                    renderOption={(optionProps, option) => (
                                        <AutocompleteOption {...optionProps}>
                                            {option.firstName} {option.lastName}
                                        </AutocompleteOption>
                                    )}
                                />
                            </FormControl>
                            <Box sx={{display: 'flex', gap: 2}}>
                                {dateNew ? <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Date *</FormLabel>
                                    <Input type="datetime-local" name="date"
                                           value={dateNew}
                                           onChange={(e) => {
                                               setDateNew(e.target.value)
                                           }}
                                           error={touched.date && Boolean(errors.date)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.date && errors.date}
                                    </FormHelperText>
                                </FormControl> : <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Date *</FormLabel>
                                    <Input type="datetime-local" name="date"
                                           value={date}
                                           onChange={handleChange}
                                           error={touched.date && Boolean(errors.date)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.date && errors.date}
                                    </FormHelperText>
                                </FormControl>}
                                {durationNew ? <FormControl sx={{width: '50%'}}>
                                    <FormLabel>Duration * </FormLabel>
                                    <Input type="number" name="duration" value={durationNew}
                                           onChange={(e) => {
                                               setDurationNew(e.target.value)
                                           }}
                                           error={touched.duration && Boolean(errors.duration)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.duration && errors.duration}
                                    </FormHelperText>
                                </FormControl> : <FormControl sx={{width: '50%'}}>
                                    <FormLabel>Duration * </FormLabel>
                                    <Input type="number" name="duration" value={duration}
                                           onChange={handleChange}
                                           error={touched.duration && Boolean(errors.duration)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.duration && errors.duration}
                                    </FormHelperText>
                                </FormControl>}
                            </Box>
                            {urlNew ?
                                <FormControl>
                                    <FormLabel>Url </FormLabel>
                                    <Input type="text" name="url"
                                           value={urlNew}
                                           onChange={(e) => {
                                               setUrlNew(e.target.value)
                                           }}
                                           error={touched.url && Boolean(errors.url)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.url && errors.url}
                                    </FormHelperText>
                                </FormControl> : <FormControl>
                                    <FormLabel>Url </FormLabel>
                                    <Input type="text" name="url"
                                           value={url}
                                           onChange={handleChange}
                                           error={touched.url && Boolean(errors.url)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.url && errors.url}
                                    </FormHelperText>
                                </FormControl>}
                            <Box sx={{display: 'flex', gap: 2}}>
                                <FormControl sx={{width: '50%'}}>
                                    <FormLabel>Topic </FormLabel>
                                    <Input type="text" name="topic"
                                           value={topic}
                                           onChange={handleChange}
                                           error={touched.topic && Boolean(errors.topic)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.topic && errors.topic}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl sx={{width: '50%'}}>
                                    <FormLabel>Grade </FormLabel>
                                    <Input type="text" name="grade" value={grade}
                                           onChange={handleChange}
                                           error={touched.grade && Boolean(errors.grade)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.grade && errors.grade}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <FormControl>
                                <FormLabel>Homework </FormLabel>
                                <Textarea minRows={1} type="text" name="homework"
                                          value={homework}
                                          onChange={handleChange}
                                          error={touched.homework && Boolean(errors.homework)}
                                />
                                <FormHelperText sx={{color: 'red'}}>
                                    {touched.homework && errors.homework}
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
                            <Box sx={{display: 'flex', gap: 2}}>
                                <FormControl sx={{width: '70%'}}>
                                    <FormLabel>Payment notes</FormLabel>
                                    <Input type="text" name="paymentNotes"
                                           value={paymentNotes}
                                           onChange={handleChange}
                                           error={touched.paymentNotes && Boolean(errors.paymentNotes)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.paymentNotes && errors.paymentNotes}
                                    </FormHelperText>
                                </FormControl>
                                {priceNew ? <FormControl min="1" required sx={{width: '30%'}}>
                                    <FormLabel>Price *</FormLabel>
                                    <Input type="number" name="price"
                                           value={priceNew}
                                           onChange={(e) => {
                                               setPriceNew(e.target.value)
                                           }}
                                           error={touched.price && Boolean(errors.price)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.price && errors.price}
                                    </FormHelperText>
                                </FormControl> :    <FormControl min="1" required sx={{width: '30%'}}>
                                    <FormLabel>Price *</FormLabel>
                                    <Input type="number" name="price"
                                           value={price}
                                           onChange={handleChange}
                                           error={touched.price && Boolean(errors.price)}
                                    />
                                    <FormHelperText sx={{color: 'red'}}>
                                        {touched.price && errors.price}
                                    </FormHelperText>
                                </FormControl>}
                            </Box>
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
            {getLessonForm()}
        </Stack>
        <Stack
            direction="column"
            spacing={2}
            sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
        >
            {getLessonForm()}
        </Stack>
    </>
}

export {LessonForm}