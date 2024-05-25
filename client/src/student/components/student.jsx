import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, {tabClasses} from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import {Card, Sheet, IconButton, } from '@mui/joy'
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';
import {getStudentWithinfo, getTeachersStudents, studentUpdate, studentDelete} from "../student-service.js";
import {getLessonsForStudentForTime} from "../../lesson/lesson-service.js";

import * as React from "react";
import {getPaymentsForStudentForTime} from "../../lesson/payment-service.js";
import {deleteBibliograhyForStudent, getBibliograhiesForStudent} from "../../bibliography/bibliography-service.js"
import {LessonsTable} from "../../lesson/components/lessons-table.jsx";
import {PaymentsTable} from "../../lesson/components/payments-table.jsx";
import {baseUrl} from "../../serverConn.jsx";
import CardContent from "@mui/joy/CardContent";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";


const Student = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        user: [user, setUser],
        students: [students, setStudents],
    } = useOutletContext();

    const nowDay = new Date()
    const [lessonMonth, setLessonMonth] = useState(nowDay.toISOString().split('T')[0].slice(0, -3))
    const [paymentMonth, setPaymentMonth] = useState(nowDay.toISOString().split('T')[0].slice(0, -3))
    const [student, setStudent] = useState(location.state?.student)
    const [studentInfo, setStudentInfo] = useState(location.state?.student?.studentInfo)
    const [error, setError] = useState('')
    const [isStudentLoading, setIsStudentLoading] = useState(true)
    const [isStudentLoadingSmall, setIsStudentLoadingSmall] = useState(false)
    const [isBibliosLoading, setIsBibliosLoading] = useState(true)
    const [isLessonsLoading, setIsLessonsLoading] = useState(true)
    const [isPaymentsLoading, setIsPaymentsLoading] = useState(true)
    const [isBibliosDeleting, setIsBibliosDeleting] = useState(false)
    const [lessons, setLessons] = useState([])
    const [payments, setPayments] = useState([])
    const [biblios, setBiblios] = useState([])
    const [totals, setTotals] = useState()
    const [showContent, setShowContent] = useState(location.state?.page === "material" ? "biblio" : "student")
    const {id} = useParams();


    useEffect(() => {
      console.log(student)
    }, [student])

    useEffect(() => {
        getStudent()
        getStudentLessons()
        getStudentPayments()
        getStudentBiblios()
    }, [id])

    useEffect(() => {
        if (!student) {
            getStudent()
        } else {
            setIsStudentLoading(false)
        }
        getStudentLessons()
        getStudentPayments()
        getStudentBiblios()
    }, [])


    useEffect(() => {
        getStudentLessons()
    }, [lessonMonth])


    useEffect(() => {
        getStudentPayments()
    }, [paymentMonth])

    const handleDeleteStudent = () => {
        setError('')
        setIsStudentLoadingSmall(true)
        studentDelete(id, (res) => {
                getStudents()
                navigate('/profile')
            },
            (err) => {
                console.log(err);
                setIsStudentLoadingSmall(false)
                setError(err);
                navigate('/profile')
            }
        )
    }

    const handleDeleteMaterialForStudent = (biblioId) => {
        setError('')
        setIsStudentLoadingSmall(true)
        deleteBibliograhyForStudent(biblioId, id, (res) => {
                getStudents()
                navigate('/profile')
            },
            (err) => {
                console.log(err);
                setIsStudentLoadingSmall(false)
                setError(err);
                navigate('/profile')
            }
        )
    }

    const getStudent = () => {
        setError('')
        setIsStudentLoading(true)
        getStudentWithinfo(id, (res) => {
                const {studentInfo, ...studentData} = res.data;
                setStudent(studentData)
                setStudentInfo(studentInfo)
                setIsStudentLoading(false)
            },
            (err) => {
                console.log(err);
                setIsStudentLoading(false)
                setError(err);
                navigate('/profile')
            }
        )
    }


    const getStudentWithoutLoading = () => {
        setError('')
        setIsStudentLoadingSmall(true)
        getStudentWithinfo(id, (res) => {
                const {studentInfo, ...studentData} = res.data;
                setStudent(studentData)
                setStudentInfo(studentInfo)
                setIsStudentLoadingSmall(false)
            },
            (err) => {
                console.log(err);
                setIsStudentLoading(false)
                setError(err);
                navigate('/profile')
            }
        )
    }

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

    const getStudentLessons = () => {
        setError('')
        setIsLessonsLoading(true)
        getLessonsForStudentForTime({
                start: `${lessonMonth}-01T07:00`,
                end: new Date(parseInt(lessonMonth.slice(0, 4)), parseInt(lessonMonth.slice(5, 7)), 0, 23).toISOString()
            }, id, (res) => {
                setLessons(res.data)
                setIsLessonsLoading(false)
            },
            (err) => {
                console.log(err);
                setIsLessonsLoading(false)
                setError(err);
            }
        )
    }

    const getStudentPayments = () => {
        setError('')
        setIsPaymentsLoading(true)
        getPaymentsForStudentForTime({
                start: `${paymentMonth}-01T07:00`,
                end: new Date(parseInt(paymentMonth.slice(0, 4)), parseInt(paymentMonth.slice(5, 7)), 0, 23).toISOString()
            }, id, (res) => {
                setPayments(res.data.payments)
                setTotals(res.data.totals)
                setIsPaymentsLoading(false)
            },
            (err) => {
                console.log(err);
                setIsPaymentsLoading(false)
                setError(err);
            }
        )
    }

    const getStudentBiblios = () => {
        setError('')
        setIsBibliosLoading(true)
        getBibliograhiesForStudent(id, (res) => {
                setBiblios(res.data)
                setIsBibliosLoading(false)
            },
            (err) => {
                console.log(err);
                setIsBibliosLoading(false)
                setError(err);
            }
        )
    }
    const handleUpdateStudentSubmit = () => {
        setError('')
        setIsStudentLoadingSmall(true)
        studentUpdate(
            {...student, ...studentInfo},
            () => {
                getStudents()
                getStudentWithoutLoading()
            },
            (err) => {
                console.log(err);
                setError(err);
                setIsStudentLoadingSmall(false)
            }
        );
    };

    const handleDeleteBiblio = (bibilioId) => {
        setError('')
        setIsBibliosDeleting(true)
        deleteBibliograhyForStudent(bibilioId, id, (res) => {
                setIsBibliosDeleting(false)
                getStudentBiblios()
            },
            (err) => {
                setIsBibliosDeleting(false)
                console.log(err);
                setError(err);
            }
        )
    }


    const getStudentForm = () => {
        return <Stack width={"100%"}>
            <Stack spacing={2} sx={{flexGrow: 1}}>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{width: '50%'}} required>
                        <FormLabel>First Name </FormLabel>
                        <Input type="text" name="firstName"
                               value={student?.firstName}
                               onChange={(e) => {
                                   setStudent({...student, firstName: e.target.value})
                               }}
                        />
                    </FormControl>
                    <FormControl sx={{width: '50%'}} required>
                        <FormLabel>Last Name </FormLabel>
                        <Input type="text" name="lastName" value={student?.lastName}
                               onChange={(e) => {
                                   setStudent({...student, lastName: e.target.value})
                               }}
                        />
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{width: '50%'}} required>
                        <FormLabel>Phone </FormLabel>
                        <Input type="text" name="phoneNumber" value={student?.phoneNumber}
                               onChange={(e) => {
                                   setStudent({...student, phoneNumber: e.target.value})
                               }}
                        />
                    </FormControl>
                    <FormControl sx={{width: '50%'}}>
                        <FormLabel>Additional phone </FormLabel>
                        <Input type="text" name="parentsPhoneNumber"
                               value={student?.parentsPhoneNumber}
                               onChange={(e) => {
                                   setStudent({...student, parentsPhoneNumber: e.target.value})
                               }}
                        />
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{width: '50%'}} required>
                        <FormLabel>Email </FormLabel>
                        <Input type="email" name="email"
                               value={student?.email}
                               onChange={(e) => {
                                   setStudent({...student, email: e.target.value})
                               }}
                        />
                    </FormControl>
                    <FormControl sx={{width: '50%'}}>
                        <FormLabel>Available time</FormLabel>
                        <Input type="text" name="availableTime"
                               value={studentInfo?.availableTime}
                               onChange={(e) => {
                                   setStudentInfo({...studentInfo, availableTime: e.target.value})
                               }}
                        />
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{width: '50%'}} required>
                        <FormLabel>Request </FormLabel>
                        <Input type="text" name="request"
                               value={studentInfo?.request}
                               onChange={(e) => {
                                   setStudentInfo({...studentInfo, request: e.target.value})
                               }}
                        />
                    </FormControl>
                    <FormControl sx={{width: '50%'}} required>
                        <FormLabel>Knowledge level </FormLabel>
                        <Input type="text" name="knowledgeLevel"
                               value={studentInfo?.knowledgeLevel}
                               onChange={(e) => {
                                   setStudentInfo({...studentInfo, knowledgeLevel: e.target.value})
                               }}
                        />
                    </FormControl>
                </Stack>
                <FormControl required>
                    <FormLabel>Character traits</FormLabel>
                    <Textarea minRows={1} type="text" name="characterTraits"
                              value={studentInfo?.characterTraits}
                              onChange={(e) => {
                                  setStudentInfo({...studentInfo, characterTraits: e.target.value})
                              }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Notes</FormLabel>
                    <Textarea minRows={1} type="text" name="notes"
                              value={studentInfo?.notes}
                              onChange={(e) => {
                                  setStudentInfo({...studentInfo, notes: e.target.value})
                              }}
                    />
                </FormControl>
            </Stack>
        </Stack>
    }

    const getBiblioForm = () => {
        return <Stack width={'100%'} direction="column" justifyContent='center' spacing={1}>
            {biblios?.map((biblio, index) => <Card
                variant="outlined"
                orientation="horizontal"
            >
                <IconButton
                    onClick={() => {
                        window.open(`${baseUrl}${biblio?.bibliography.url}`)
                    }}
                    ratio="1"
                    variant="soft"
                    color="neutral"
                    sx={{
                        minWidth: 32,
                        borderRadius: '50%',
                        '--Icon-fontSize': '16px',
                    }}
                >
                    <InsertDriveFileRoundedIcon/>
                </IconButton>
                <CardContent>
                    <Typography level="body-sm" fontSize="sm">{biblio?.bibliography.name}</Typography>
                    <Typography level="body-sm" fontSize="sm">{biblio?.bibliography.author}</Typography>
                </CardContent>
                {isBibliosDeleting ?
                    <CircularProgress
                        color='inherit'
                        size='1.5rem'
                    /> : <IconButton onClick={() => {
                        handleDeleteBiblio(biblio?.bibliography.id)
                    }} variant="plain" color="danger" size="sm" sx={{mt: -1, mr: -1}}>
                        <RemoveCircleOutlineRoundedIcon/>
                    </IconButton>}
            </Card>)}
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
                        Students
                    </Link>
                    <Link
                        underline="hover"
                        color="neutral"
                        href="#some-link"
                        fontSize={12}
                        fontWeight={500}
                    >
                        {student?.firstName} {student?.lastName}
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
                        setShowContent("student")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={location.state?.page === "material" ? 3 : 0}>
                            Student info
                        </Tab>
                    </Box>
                    <Box onClick={() => {
                        setShowContent("lesson")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={1}>Lessons info
                        </Tab>
                    </Box>
                    <Box onClick={() => {
                        setShowContent("payment")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={2}>Payments info
                        </Tab>
                    </Box>
                    <Box onClick={() => {
                        setShowContent("biblio")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={location.state?.page === "material" ? 0 : 3}>Materials info
                        </Tab>
                    </Box>
                    {student && <><Box onClick={() => {
                        navigate('/lesson-add', {
                            state: {
                                student: student,
                            }
                        })
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={4}> Add lesson
                        </Tab>
                    </Box>
                    <Box onClick={() => {
                        navigate('/material-add', {
                            state: {
                                student: student,
                            }
                        })
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={5}> Add material
                        </Tab>
                    </Box></>}
                </TabList>
            </Tabs>
        </Box>
        {(showContent === "payment" || showContent === "lesson") && <Stack spacing={1} paddingX={9}>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: {xs: 'none', sm: 'flex'},
                    flexWrap: 'wrap',
                    width: "20%",
                    alignSelf: 'center',
                    gap: 1.5,
                    '& > *': {
                        minWidth: {xs: '120px', md: '160px'},
                    },
                }}
            >
                <FormControl sx={{flex: 1}} size="sm">
                    <FormLabel></FormLabel>
                    {showContent === "lesson" && <Input type="month" value={lessonMonth} onChange={(e) => {
                        if (e.target.value !== '') setLessonMonth(e.target.value)
                    }} size="sm" placeholder="Search"/>}
                    {showContent === "payment" && <Input type="month" value={paymentMonth} onChange={(e) => {
                        if (e.target.value !== '') setPaymentMonth(e.target.value)
                    }} size="sm" placeholder="Search"/>}
                </FormControl>
            </Box>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: {xs: 'none', sm: 'flex'},
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: "100%",
                    alignSelf: 'center',
                    gap: 1.5,
                    '& > *': {
                        minWidth: {xs: '120px', md: '160px'},
                    },
                }}
            >
                {showContent === "lesson" &&
                    <LessonsTable error={error} loading={isLessonsLoading} lessons={lessons} student={true}/>}
                {showContent === "payment" &&
                    <PaymentsTable error={error} loading={isPaymentsLoading} totals={totals} payments={payments} student={true}/>}
            </Box>
        </Stack>}
        {(showContent === "student" || showContent === "biblio") && <Stack
            spacing={4}
            sx={{
                display: 'flex',
                maxWidth: '800px',
                mx: 'auto',
                px: {xs: 2, md: 6},
                py: {xs: 2, md: 3},
            }}
        >
            {showContent === "student" && <Card>
                <Box sx={{mb: 1}}>
                    <Typography level="title-md">Student info</Typography>
                    <Typography level="body-sm">
                        Manage this student information.
                    </Typography>
                </Box>
                <Divider/>
                {isStudentLoading ? <Stack sx={{alignItems: 'center'}}><CircularProgress
                        color='inherit'
                        size='5rem'
                    /> </Stack> : <Stack>
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
                </Stack> </Stack>}
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
                            <Button onClick={() => {handleDeleteStudent()}} size="sm" variant="outlined" color="danger">
                                {isStudentLoadingSmall ? (
                                    <CircularProgress
                                        color='inherit'
                                        size='1.5rem'
                                    />
                                ) : (
                                    `Delete`
                                )}
                            </Button>
                        </CardActions>
                        <CardActions alignSelf={'center'}>
                            <Button onClick={() => {
                                getStudentWithoutLoading()
                            }} size="sm" variant="outlined" color="neutral">
                                {isStudentLoadingSmall ? (
                                    <CircularProgress
                                        color='inherit'
                                        size='1.5rem'
                                    />
                                ) : (
                                    `Reset`
                                )}
                            </Button>
                            <Button onClick={() => {
                                handleUpdateStudentSubmit()
                            }}
                                    size="sm" variant="solid">
                                {isStudentLoadingSmall ? (
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
            </Card>}
            {showContent === "biblio" && <Card>
                <Box sx={{mb: 1}}>
                    <Typography level="title-md">Student materials</Typography>
                    <Typography level="body-sm">
                        Manage student materials.
                    </Typography>
                </Box>
                <Divider/>
                {isBibliosLoading ? <Stack sx={{alignItems: 'center'}}>
                    <CircularProgress
                    color='inherit'
                    size='5rem'
                /> </Stack> : <Stack><Stack
                    direction="row"
                    spacing={3}
                    justifyContent={'center'}
                    sx={{display: {xs: 'none', md: 'flex'}, my: 1}}
                >
                    {getBiblioForm()}
                </Stack>
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent={'center'}
                    sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
                >
                    {getBiblioForm()}
                </Stack></Stack>}
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
                </CardOverflow>
            </Card>}
            </Stack>}
        </Box>

        }

        export {
        Student
    };