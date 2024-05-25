import * as React from "react"
import GlobalStyles from "@mui/joy/GlobalStyles"

import {
    Divider,
    Typography,
    Box,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemContent,
    ListItemButton,
    Sheet
} from "@mui/joy";

import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

import {closeSidebar} from "./utils"
import {useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";

import {getTeachersStudents} from "../student/student-service.js";
import logo from '../assets/logo.jpg';
import {baseUrl} from "../serverConn.jsx";

function Toggler({defaultExpanded = false, renderToggle, children}) {
    const [open, setOpen] = React.useState(defaultExpanded)
    return (
        <React.Fragment>
            {renderToggle({open, setOpen})}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: open ? "1fr" : "0fr",
                    transition: "0.2s ease",
                    "& > *": {
                        overflow: "hidden"
                    }
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    )
}

const Sidebar = ({user, setUser, students, setStudents}) => {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    useEffect(() => {
        getStudents()
    }, [])

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

    const onLogOut = () => {
        window.localStorage.setItem('token', "");
        setUser(null)
        navigate("/login")
    }

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: {xs: "fixed", md: "sticky"},
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none'
                },
                transition: "transform 0.4s, width 0.4s",
                zIndex: 10000,
                height: "100dvh",
                width: "var(--Sidebar-width)",
                top: 0,
                p: 2,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRight: "1px solid",
                borderColor: "divider"
            }}
        >
            <GlobalStyles
                styles={theme => ({
                    ":root": {
                        "--Sidebar-width": "220px",
                        [theme.breakpoints.up("lg")]: {
                            "--Sidebar-width": "240px"
                        }
                    }
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: "fixed",
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    opacity: "var(--SideNavigation-slideIn)",
                    backgroundColor: "var(--joy-palette-background-backdrop)",
                    transition: "opacity 0.4s",
                    transform: {
                        xs:
                            "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
                        lg: "translateX(-100%)"
                    }
                }}
                onClick={() => closeSidebar()}
            />

            <Box direction="row" sx={{display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between", p: 2}}>
                <Typography level="title-lg">Rozum hub</Typography>
                <Avatar
                    variant="outlined"
                    size="lg"
                    src={logo}
                />
            </Box>
            <Box
                sx={{
                    minHeight: 0,
                    overflow: "hidden auto",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        "--List-nestedInsetStart": "30px",
                        "--ListItem-radius": theme => theme.vars.radius.sm
                    }}
                >
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate("/profile")
                        }}>
                            <HomeRoundedIcon/>
                            <ListItemContent >
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate("/schedule")
                        }}>
                            <CalendarMonthRoundedIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">Schedule</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({open, setOpen}) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <AddCircleOutlineRoundedIcon/>
                                    <ListItemContent>
                                        <Typography level="title-sm">Add</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={{transform: open ? "rotate(180deg)" : "none"}}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{gap: 0.5}}>
                                <ListItem>
                                    <ListItemButton onClick={() => {
                                        navigate("/lesson-add")
                                    }}>
                                        <ListItemContent>
                                            <Typography level="title-sm">Lesson</Typography>
                                        </ListItemContent>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton onClick={() => {
                                        navigate("/student-add")
                                    }}>
                                        <ListItemContent>
                                            <Typography level="title-sm">Student</Typography>
                                        </ListItemContent>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton onClick={() => {
                                        navigate("/bibliography-add")
                                    }}>
                                        <ListItemContent>
                                            <Typography level="title-sm">Bibliography</Typography>
                                        </ListItemContent>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton onClick={() => {
                                        navigate("/material-add")
                                    }}>
                                        <ListItemContent>
                                            <Typography level="title-sm">Material</Typography>
                                        </ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>


                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate("/lessons")
                        }}>
                            <AssignmentRoundedIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">Lessons</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate("/payments")
                        }}>
                            <MonetizationOnRoundedIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">Payments</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate("/bibliographies")
                        }}>
                            <AutoStoriesRoundedIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">Bibliographies</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({open, setOpen}) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <GroupRoundedIcon/>
                                    <ListItemContent>
                                        <Typography level="title-sm">My students</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={{transform: open ? "rotate(180deg)" : "none"}}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{gap: 0.5}}>
                                {students?.map((s) =>
                                    <ListItem sx={{mt: 0.5}} onClick={() => {
                                        navigate(`/student/${s.id}`)
                                    }} key={s.id}>
                                        <ListItemButton>{s.firstName + " " + s.lastName}</ListItemButton>
                                    </ListItem>)}
                                {error && <ListItem>
                                    <ListItemButton>  {Array.isArray(error) ? error[0] : error}</ListItemButton>
                                </ListItem>}
                            </List>
                        </Toggler>
                    </ListItem>
                </List>
            </Box>
            <Divider/>
            <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                <Avatar
                    variant="outlined"
                    size="md"
                     src={`${baseUrl}${user?.avatarUrl}`}
                />
                <Box sx={{minWidth: 0, flex: 1}}>
                    <Typography level="title-sm"> {user?.firstName} {user?.lastName}</Typography>
                </Box>
                <IconButton onClick={() => {onLogOut()}} size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon/>
                </IconButton>
            </Box>
        </Sheet>
    )
}
export {Sidebar}