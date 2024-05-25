import {
    Box, Input, Typography, Stack, Link, FormLabel, FormControl,
    Tabs, TabList, Tab, tabClasses, Breadcrumbs, IconButton, Card, CardOverflow, Table, Divider
} from "@mui/joy";
import {CircularProgress} from "@mui/material";

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded.js";

import {useEffect, useState} from "react";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";

import {getLessonsForTime} from "../lesson-service.js";


const DaySchedule = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const offset = 3
    const workHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    const nowDay = new Date()
    const [day, setDay] = useState(new Date(nowDay.getFullYear(), nowDay.getMonth(),
        nowDay.getDate(), nowDay.getHours() + offset).toISOString().split('T')[0])
    const [lessons, setLessons] = useState([])
    const [error, setError] = useState('')
    const [isDayLoading, setIsDayLoading] = useState(true)

    useEffect(() => {
        console.log()
    }, [lessons])

    useEffect(() => {
        getLessons()
    }, [day])

    const getLessons = () => {
        setError('')
        setIsDayLoading(true)
        getLessonsForTime({
                start: `${day}T07:00`,
                end: `${day}T23:00`
            }, (res) => {
                setLessons(res.data)
                setIsDayLoading(false)
            },
            (err) => {
                console.log(err);
                setIsDayLoading(false)
                setError(err);
            }
        )
    }


    const getDayForm = () => {
        return <Table
            hoverRow
            size="sm"
            borderAxis="none"
            variant="soft"
            sx={{
                '--TableCell-paddingX': '1rem',
                '--TableCell-paddingY': '1rem',
            }}
        >
            <thead>
            <tr>
                <th>
                    <Typography level="title-sm">Hour</Typography>
                </th>
                <th>
                    <Typography level="title-sm">
                        Lesson
                    </Typography>
                </th>
            </tr>
            </thead>
            <tbody>
            {workHours.map((hour, index) => <tr>
                <td>
                    <Typography
                        level="title-sm"
                        startDecorator={<AccessTimeFilledRoundedIcon/>}
                        sx={{alignItems: 'flex-start'}}
                    >
                        {hour}:00
                    </Typography>
                </td>
                <td>
                    {lessons?.map((l) =>
                        <Typography justifyContent={'center'} level="body-md" key={l.id}>
                            {(new Date(l.date).getUTCHours() + l.slots) > hour && new Date(l.date).getUTCHours() <= hour &&
                                <Stack>
                                    <Typography
                                        alignSelf={'center'}>{l.student.firstName + " " + l.student.lastName}</Typography>
                                    <Typography
                                        alignSelf={'center'}>{new Date(l.date).getUTCHours()} : {new Date(l.date).getUTCMinutes() < 10 && "0"}
                                        {new Date(l.date).getUTCMinutes()} - {
                                            new Date(new Date(l.date).getTime() + l.duration * 60000).getUTCHours()} :{" "}{new Date(new Date(l.date).getTime() + l.duration * 60000).getUTCMinutes() < 10 && '0'}{
                                            new Date(new Date(l.date).getTime() + l.duration * 60000).getUTCMinutes()}
                                        <IconButton
                                            onClick={() => {
                                                navigate(`/lesson/${l.id}`, {
                                                    state: {
                                                        lesson: l,
                                                    }
                                                })
                                            }}
                                            aria-label="upload new picture"
                                            size="sm"
                                            variant="outlined"
                                            color="neutral"
                                            sx={{
                                                bgcolor: 'background.body',
                                                borderRadius: '50%',
                                                boxShadow: 'sm',
                                                ml: 3,
                                            }}
                                        >
                                            <OpenInNewRoundedIcon/>
                                        </IconButton>
                                    </Typography>
                                </Stack>}
                        </Typography>)}
                </td>
            </tr>)}
            </tbody>
        </Table>
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
                        Schedule
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
        <Stack
            spacing={4}
            sx={{
                display: 'flex',
                maxWidth: '700px',
                mx: 'auto',
                px: {xs: 2, md: 6},
                py: {xs: 2, md: 3},
            }}
        >
            <Stack><Card>
                <Box sx={{mb: 1}}>
                    <Typography onClick={() => {
                        getLessons()
                    }} level="title-md">Day schedule</Typography>
                    <Typography level="body-sm">
                        Select a day to see its schedule.
                    </Typography>
                </Box>
                <Divider/>
                <FormControl required>
                    <FormLabel>Day </FormLabel>
                    <Input type="date" name="day"
                           value={day}
                           onChange={(e) => {
                               if (e.target.value !== '') setDay(e.target.value)
                           }}
                    />
                </FormControl>
                {isDayLoading ? <Stack sx={{alignItems: 'center'}}><CircularProgress
                    color='inherit'
                    size='5rem'
                /> </Stack> : <Stack><Stack
                    direction="row"
                    spacing={3}
                    sx={{display: {xs: 'none', md: 'flex'}, my: 1}}
                >
                    {getDayForm()}
                </Stack>
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
                    >
                        {getDayForm()}
                    </Stack>
                </Stack>
                }
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
            </Card>
            </Stack>
        </Stack>
    </Box>

}

export {DaySchedule};