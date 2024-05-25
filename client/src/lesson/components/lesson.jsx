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
    Checkbox,
    Textarea,
    Chip
} from "@mui/joy";

import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'

import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getLessonWithPayment, lessonDelete, lessonUpdate} from "../lesson-service.js";
import {paymentUpdate} from "../payment-service.js";
import {CircularProgress} from "@mui/material";
import * as React from "react";


const Lesson = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const offset = 3

    const [lesson, setLesson] = useState(location.state?.lesson)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingSmall, setIsLoadingSmall] = useState(false)
    const [showContent, setShowContent] = useState(location.state?.page === "payment" ? "payment" : "lesson")
    const [payment, setPayment] = useState(location.state?.lesson?.payment)
    const {id} = useParams();

    useEffect(() => {
        if (!lesson) {
            getLesson()
        } else {
            setIsLoading(false)
        }
    }, [])

    const getLesson = () => {
        setError('')
        setIsLoading(true)
        getLessonWithPayment(id, (res) => {
                setLesson(res.data)
                setPayment(res.data.payment)
                setIsLoading(false)
            },
            (err) => {
                console.log(err);
                setIsLoading(false)
                setError(err);
            }
        )
    }

    const getLessonWithoutLoading = () => {
        setError('')
        setIsLoadingSmall(true)
        getLessonWithPayment(id, (res) => {
                setLesson(res.data)
                setPayment(res.data.payment)
                setIsLoadingSmall(false)
            },
            (err) => {
                console.log(err);
                setIsLoadingSmall(false)
                setError(err);
            }
        )
    }

    const handleStatusChange = (status) => {
        if (!status) {
            setLesson({...lesson, status: status, homeworkCheck: false, rating: null})
        } else {
            setLesson({...lesson, status: status})
        }
    }

    const handleUpdateLessonSubmit = () => {
        setError('')
        setIsLoadingSmall(true);
        lessonUpdate(
            lesson,
            () => {
                getLessonWithoutLoading()
            },
            (err) => {
                console.log(err);
                setError(err);
                setIsLoadingSmall(false)
            }
        );
    };

    const handleDeleteLesson = () => {
        setError('')
        setIsLoadingSmall(true);
        lessonDelete(id,
            () => {
                navigate('/lessons')
            },
            (err) => {
                console.log(err);
                setError(err);
                setIsLoadingSmall(false)
            }
        );
    };

    const handleRescheduleNextWeekLesson = () => {
        const date = new Date(lesson?.date);
        date.setDate(date.getDate() + 7);

        navigate('/lesson-add', {
            state: {
                date: date.toISOString(),
                price: lesson?.payment?.price,
                student: lesson?.student,
                duration: lesson?.duration,
                url: lesson?.url
            }
        })

    }

    const handleUpdatePaymentSubmit = () => {
        setError('')
        setIsLoadingSmall(true);
        paymentUpdate(
            payment,
            () => {
                getLessonWithoutLoading();
            },
            (err) => {
                console.log(err);
                setError(err);
                setIsLoadingSmall(false);
            }
        );
    };

    const getPaymentForm = () => {
        return <Stack width={"100%"}>
            <Stack spacing={2} sx={{flexGrow: 1}}>
                <Stack direction="row" spacing={2}>
                    <FormControl required sx={{width: '50%'}}>
                        <FormLabel>Price </FormLabel>
                        <Input onChange={(e) => {
                            setPayment({...payment, price: e.target.value})
                        }} size="sm" type={'number'} placeholder="Duration" value={payment?.price}/>
                    </FormControl>
                    <FormControl required sx={{flexGrow: 1, width: "50%", justifyContent: 'center'}}>
                        <FormLabel>Status </FormLabel>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'start',
                            }}
                        >
                            <Checkbox onChange={(e) => {
                                setPayment({...payment, status: e.target.checked})
                            }}
                                      size="lg" checked={payment?.status} name="status"/>
                            <Typography
                                sx={{ml: 1}}>{payment?.status ? <Chip
                                variant="soft"
                                size="lg"
                                startDecorator={<CheckRoundedIcon/>}
                                color={'success'}
                            >
                                paid
                            </Chip> : <Chip
                                variant="soft"
                                size="lg"
                                startDecorator={<AutorenewRoundedIcon/>}
                                color={'danger'}
                            >
                                unpaid
                            </Chip>} </Typography>{payment?.status &&
                            <Typography sx={{ml: 1, mt: 0.3}}>{new Date(new Date().getFullYear(), new Date().getMonth(),
                                new Date().getDate(), new Date().getHours() + offset, new Date().getMinutes()).toLocaleString('en-GB', {timeZone: "Etc/GMT"})}</Typography>}
                        </Box> </FormControl>
                </Stack>
                <Stack spacing={1}>
                    <FormLabel> Payment notes </FormLabel>
                    <FormControl
                        sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}>
                        <Textarea onChange={(e) => {
                            setPayment({...payment, paymentNotes: e.target.value})
                        }}
                                  size="sm" value={payment?.paymentNotes} placeholder="Payment notes"/>
                    </FormControl>
                </Stack>
            </Stack>
        </Stack>
    }

    const getLessonForm = () => {
        return <Stack width={"100%"}>
            <Stack spacing={2} sx={{flexGrow: 1}}>
                <Stack direction="row" spacing={2}>
                    <FormControl required sx={{width: '50%'}}>
                        <FormLabel>Duration </FormLabel>
                        <Input onChange={(e) => {
                            setLesson({...lesson, duration: e.target.value})
                        }} size="sm" type={'number'} placeholder="Duration" value={lesson?.duration}/>
                    </FormControl>
                    <FormControl required sx={{flexGrow: 1, width: "50%", justifyContent: 'center'}}>
                        <FormLabel>Status </FormLabel>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'start',
                            }}
                        >
                            <Checkbox onChange={(e) => {
                                handleStatusChange(e.target.checked)
                            }}
                                      size="lg" checked={lesson?.status} name="status"/>
                            {lesson?.status ? <Typography sx={{ml: 1}}>{payment?.status ? <Chip
                                variant="soft"
                                size="lg"
                                startDecorator={<CheckRoundedIcon/>}
                                color={'success'}
                            >
                                paid
                            </Chip> : <Chip
                                variant="soft"
                                size="lg"
                                startDecorator={<AutorenewRoundedIcon/>}
                                color={'danger'}
                            >
                                unpaid
                            </Chip>}</Typography> : <Typography sx={{ml: 1}}> <Chip
                                variant="soft"
                                size="lg"
                                startDecorator={<AssignmentRoundedIcon/>}
                                color={'neutral'}
                            >
                                planned
                            </Chip> </Typography>}
                        </Box> </FormControl>
                </Stack>
                <Stack spacing={1}>
                    <FormLabel> <a target='_blank' rel='noopener noreferrer' href={lesson?.url}>
                        Url</a> </FormLabel>
                    <FormControl
                        sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}>
                        <Input onChange={(e) => {
                            setLesson({...lesson, url: e.target.value})
                        }} size="sm" value={lesson?.url} placeholder="Url"/>
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{width: '50%'}}>
                        <FormLabel>Topic</FormLabel>
                        <Input onChange={(e) => {
                            setLesson({...lesson, topic: e.target.value})
                        }} size="sm" placeholder="Topic" value={lesson?.topic}/>
                    </FormControl>
                    <FormControl sx={{flexGrow: 1, width: "50%"}}>
                        <FormLabel>Grade</FormLabel>
                        <Input onChange={(e) => {
                            setLesson({...lesson, grade: e.target.value})
                        }} size="sm" placeholder="Grade" value={lesson?.grade}/>
                    </FormControl>
                </Stack>
                <Stack spacing={1}>
                    <FormLabel> Homework </FormLabel>
                    <FormControl
                        sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}>
                        <Textarea onChange={(e) => {
                            setLesson({...lesson, homework: e.target.value})
                        }}
                                  size="sm" value={lesson?.homework} placeholder="Homework"/>
                    </FormControl>
                </Stack>
                <Stack spacing={1}>
                    <FormLabel> Notes </FormLabel>
                    <FormControl
                        sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}>
                        <Textarea onChange={(e) => {
                            setLesson({...lesson, notes: e.target.value})
                        }}
                                  size="sm" value={lesson?.notes} placeholder="Notes"/>
                    </FormControl>
                </Stack>
                {lesson?.status &&
                    <Stack spacing={2} sx={{flexGrow: 1}}>
                        <Divider/>
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{width: '50%'}}>
                                <FormLabel>Rating </FormLabel>
                                <Input size="sm" type={'number'} placeholder="Rating"
                                       onChange={(e) => {
                                           setLesson({...lesson, rating: e.target.value})
                                       }}
                                       value={lesson?.rating}/>
                            </FormControl>
                            <FormControl required sx={{flexGrow: 1, width: "50%", justifyContent: 'center'}}>
                                <FormLabel>Homework check </FormLabel>
                                <Box
                                    onChange={(e) => {
                                        setLesson({...lesson, homeworkCheck: e.target.checked})
                                    }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Checkbox size="lg" checked={lesson?.homeworkCheck} name="homeworkCheck"/>
                                    <Typography
                                        sx={{ml: 1}}>{lesson?.homeworkCheck ? "Checked" : 'Unckecked'}</Typography>
                                </Box> </FormControl>
                        </Stack>
                    </Stack>}
            </Stack>
        </Stack>
    }

    return <Box sx={{flex: 1, width: '100%'}}>
        <Box
            sx={{
                position: 'sticky',
                top: {sm: -100, md: -110},
                bgcolor: 'background.body',
                zIndex: 9995,
            }}
        >
            <Box sx={{px: {xs: 2, md: 6}}}>
                <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={<ChevronRightRoundedIcon fontSize="sm"/>}
                    sx={{pl: 0}}
                >
                    <Link
                        underline="none"
                        color="neutral"
                        href="#some-link"
                        aria-label="Home"
                    >
                        <SchoolRoundedIcon/>
                    </Link>
                    <Link
                        underline="hover"
                        color="neutral"
                        href="#some-link"
                        fontSize={12}
                        fontWeight={500}
                    >
                        Lessons
                    </Link>
                    <Link
                        underline="hover"
                        color="neutral"
                        href="#some-link"
                        fontSize={12}
                        fontWeight={500}
                    >
                        {lesson?.date && <>{new Date(lesson?.date).toLocaleString('en-GB', {timeZone: "Etc/GMT"})}</>}
                    </Link>
                </Breadcrumbs>
            </Box>
            <Tabs
                defaultValue={0}
                sx={{
                    bgcolor: 'transparent',
                }}
            >
                <TabList
                    tabFlex={1}
                    size="sm"
                    sx={{
                        pl: {xs: 0, md: 4},
                        justifyContent: 'left',
                        [`&& .${tabClasses.root}`]: {
                            fontWeight: '600',
                            flex: 'initial',
                            color: 'text.tertiary',
                            [`&.${tabClasses.selected}`]: {
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&::after': {
                                    height: '2px',
                                    bgcolor: 'primary.500',
                                },
                            },
                        },
                    }}
                >
                    <Box onClick={() => {
                        setShowContent("lesson")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset
                             value={location.state?.page === "payment" ? 1 : 0}>
                            Lesson info
                        </Tab>
                    </Box>
                    <Box onClick={() => {
                        setShowContent("payment")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset
                             value={location.state?.page === "payment" ? 0 : 1}>Payment info
                        </Tab>
                    </Box>
                </TabList>
            </Tabs>
        </Box>
        <Stack
            spacing={4}
            sx={{
                display: 'flex',
                maxWidth: '800px',
                mx: 'auto',
                px: {xs: 2, md: 6},
                py: {xs: 2, md: 3},
            }}
        >
            <Card>
                <Box sx={{mb: 1, justifyContent: "space-between"}}>
                    <Box>
                        <Typography
                            level="title-md">{showContent === "lesson" ? `Lesson info` : `Lesson payment info`} </Typography>
                        <Typography level="body-sm">
                            {showContent === "lesson" ? `Manage this lesson information.` : ` Manage this payment information for the lesson.`}
                        </Typography>
                    </Box>
                    {showContent === "lesson" && <CardActions alignSelf={'center'}>
                        <Button alignSelf="center" onClick={() => {
                            handleRescheduleNextWeekLesson()
                        }}
                                size="sm" variant="outlined" color={"neutral"}>
                            Add to the next week
                        </Button>
                    </CardActions>}
                </Box>
                {isLoading ? <Stack sx={{alignItems: 'center'}}><CircularProgress
                        color='inherit'
                        size='5rem'
                    /> </Stack> : <Stack>
                    <Box direction="row">
                    <Tooltip title="Click on student icon to see student profile">
                        <Typography sx={{m: 1}} startDecorator={<AssignmentIndRoundedIcon
                            onClick={() => {
                                navigate(`/student/${lesson?.student?.id}`)
                            }}/>}
                                    level="title-md"> {lesson?.student?.firstName} {lesson?.student?.lastName} </Typography>
                    </Tooltip>
                    <Typography sx={{m: 1}} startDecorator={<AccessTimeFilledRoundedIcon/>}
                                level="title-md"> {new Date(lesson?.date).toLocaleString('en-GB', {timeZone: "Etc/GMT"})}  </Typography>
                    {showContent === "lesson" && <Typography sx={{m: 1}} startDecorator={<MonetizationOnRoundedIcon/>}
                                                             level="title-md"> {lesson?.payment?.price} hrn </Typography>}
                </Box>
                <Divider/>
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{display: {xs: 'none', md: 'flex'}, my: 1}}
                >
                    {showContent === "lesson" ? getLessonForm() : getPaymentForm()}
                </Stack>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
                >
                    {showContent === "lesson" ? getLessonForm() : getPaymentForm()}
                </Stack>
                <CardOverflow sx={{borderTop: '1px solid', borderColor: 'divider'}}>
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
                    <CardActions sx={{justifyContent: "space-between"}}>
                        <CardActions>
                            {showContent === "lesson" && <Button onClick={() => {handleDeleteLesson()}} size="sm" variant="outlined" color="danger">
                                {isLoadingSmall ? (
                                    <CircularProgress
                                        color='inherit'
                                        size='1.5rem'
                                    />
                                ) : (
                                    `Delete`
                                )}
                            </Button>}
                        </CardActions>
                        <CardActions alignSelf={'center'}>
                            <Button onClick={() => {
                                getLessonWithoutLoading()
                            }} size="sm" variant="outlined" color="neutral">
                                {isLoadingSmall ? (
                                    <CircularProgress
                                        color='inherit'
                                        size='1.5rem'
                                    />
                                ) : (
                                    `Reset`
                                )}
                            </Button>
                            <Button onClick={() => {
                                {
                                    showContent === "lesson" ? handleUpdateLessonSubmit() : handleUpdatePaymentSubmit()
                                }
                            }}
                                    size="sm" variant="solid">
                                {isLoadingSmall ? (
                                    <CircularProgress
                                        color='inherit'
                                        size='1.5rem'
                                    />
                                ) : (
                                    `Redact`
                                )}
                            </Button>
                        </CardActions>
                    </CardActions>
                </CardOverflow>
                </Stack>}
            </Card>
        </Stack>
    </Box>

}

export {Lesson};