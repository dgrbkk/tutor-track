import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded.js";
import Link from "@mui/joy/Link";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded.js";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, {tabClasses} from "@mui/joy/Tab";
import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import {LessonsTable} from "./lessons-table.jsx";
import {PaymentsTable} from "./payments-table.jsx";
import Stack from "@mui/joy/Stack";
import {getLessonsForTeacherForTime} from "../lesson-service.js";
import { useOutletContext } from "react-router-dom";

const Lessons = () => {
    const navigate = useNavigate();


    const nowDay = new Date()
    const [lessonMonth, setLessonMonth] = useState(nowDay.toISOString().split('T')[0].slice(0, -3))
    const [error, setError] = useState('')
    const [isLessonsLoading, setIsLessonsLoading] = useState(true)
    const [lessons, setLessons] = useState([])


    useEffect(() => {
        getTeacherLessons()
    }, [lessonMonth])

    const getTeacherLessons = () => {
        setError('')
        setIsLessonsLoading(true)
        getLessonsForTeacherForTime({
                start: `${lessonMonth}-01T07:00`,
                end: new Date(parseInt(lessonMonth.slice(0, 4)), parseInt(lessonMonth.slice(5, 7)), 0, 23).toISOString()
            },  (res) => {
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
                        {lessonMonth}
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
                </TabList>
            </Tabs>
        </Box>
        <Stack spacing={1} paddingX={9}>
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
                    <Input type="month" value={lessonMonth} onChange={(e) => {
                        if (e.target.value !== '') setLessonMonth(e.target.value)
                    }} size="sm" placeholder="Search"/>
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
                <LessonsTable error={error} loading={isLessonsLoading} lessons={lessons} />
            </Box>
        </Stack>
    </Box>
}

export {Lessons}