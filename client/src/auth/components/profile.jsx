import * as React from 'react';
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
    IconButton, FormHelperText
} from "@mui/joy";
import {CircularProgress} from "@mui/material";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import {useLocation, useOutletContext} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

import {avatarUpload, getTeacherInfo, teacherUpdate} from "../auth-service.js";
import {baseUrl} from "../../serverConn.jsx";



const Profile = () => {
    const location = useLocation();
    const {
        user: [user, setUser],
        students: [students, setStudents],
    } = useOutletContext();

    const [userNew, setUserNew] = useState(user)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingSmall, setIsLoadingSmall] = useState(false)
    const inputAvatar = useRef(null)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [showContent, setShowContent] = useState('profile')
    const [visibility, setVisibility] = useState(false)


    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(() => {
        if (!user) {
            getUser()
        } else {
            setIsLoading(false)
        }
    }, [])

    const getUser = () => {
        setError('')
        setIsLoading(true)
        getTeacherInfo((res) => {
                setUserNew(res.data)
                setIsLoading(false)
            },
            (err) => {
                console.log(err);
                setIsLoading(false)
                setError(err);
            }
        )
    }

    const getUserWithoutLoading = () => {
        setError('')
        setIsLoadingSmall(true)
        getTeacherInfo((res) => {
                setUserNew(res.data)
                setIsLoadingSmall(false)
            },
            (err) => {
                console.log(err);
                setIsLoadingSmall(false)
                setError(err);
            }
        )
    }

    const handleAvatarSubmit = (event) => {
        setError('')

        const avaData = new FormData();
        const file = event.currentTarget.files[0];

        avaData.append("image", file);

        avatarUpload(avaData, (res) => {
            setUserNew({...user, avatarUrl: res.url})
        }, (err) => {
            console.log(err)
            setError(err)
        })
    }

    const handleUpdateUserSubmit = () => {
        setError('')
        setIsLoadingSmall(true);
        teacherUpdate(
            userNew,
            (res) => {
                setUser(res.data)
                getUserWithoutLoading()
            },
            (err) => {
                console.log(err);
                setError(err);
                setIsLoadingSmall(false);
            }
        );
    };

    const getPasswordForm = () => {
        return <Stack width={'100%'}>
            <Stack spacing={2} sx={{flexGrow: 1}}>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{width: "50%"}} required>
                        <FormLabel>Password</FormLabel>
                        <Input
                            endDecorator={visibility ? <VisibilityRoundedIcon onClick={() => {setVisibility(!visibility)}}/>
                        : <VisibilityOffRoundedIcon onClick={() => {setVisibility(!visibility)}}/>}
                            type={visibility ? 'text' : 'password'}
                            name='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl sx={{width: "50%"}} required>
                        <FormLabel>New password</FormLabel>
                        <Input
                            endDecorator={visibility ? <VisibilityRoundedIcon onClick={() => {setVisibility(!visibility)}}/>
                                : <VisibilityOffRoundedIcon onClick={() => {setVisibility(!visibility)}}/>}
                            type={visibility ? 'text' : 'password'}
                            name='password'
                            id='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </FormControl>
                </Stack>
            </Stack>
        </Stack>
    }

    const getUserForm = () => {
        return <>
            <input ref={inputAvatar} type="file" accept="image/*"
                   onChange={handleAvatarSubmit} hidden/>
            <Stack direction="column" spacing={1}>
                <AspectRatio
                    onDoubleClick={() => {
                        setUserNew({...userNew, avatarUrl: "/uploads/default.jpg"})
                    }}
                    ratio="1"
                    maxHeight={200}
                    sx={{flex: 1, minWidth: 120, borderRadius: '100%'}}
                >
                    <img
                        src={`${baseUrl}${userNew?.avatarUrl}`}
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
                            left: 100,
                            top: 170,
                            boxShadow: 'sm',
                        }}
                    >
                        <EditRoundedIcon/>
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack spacing={2} sx={{flexGrow: 1}}>
                <Stack spacing={1}>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}
                    >
                        <Input size="sm" defaultValue={userNew?.firstName}
                               onChange={(e) => {
                                   setUserNew({...userNew, firstName: e.target.value})
                               }} placeholder="First name"/>
                        <Input size="sm" defaultValue={userNew?.lastName}
                               onChange={(e) => {
                                   setUserNew({...userNew, lastName: e.target.value})
                               }} placeholder="Last name" sx={{flexGrow: 1}}/>
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <Input size="sm" startDecorator={<PhoneRoundedIcon/>} placeholder="Phone"
                               onChange={(e) => {
                                   setUserNew({...userNew, phoneNumber: e.target.value})
                               }} defaultValue={userNew?.phoneNumber}/>
                    </FormControl>
                    <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            disabled
                            color={"#32383e"}
                            size="sm"
                            type="email"
                            startDecorator={<EmailRoundedIcon/>}
                            placeholder="email"
                            defaultValue={userNew?.email}
                            sx={{flexGrow: 1}}
                        />
                    </FormControl>
                </Stack>
            </Stack>
        </>
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
                        <HomeRoundedIcon/>
                    </Link>
                    <Link
                        underline="hover"
                        color="neutral"
                        href="#some-link"
                        fontSize={12}
                        fontWeight={500}
                    >
                        My profile
                    </Link>
                    {showContent === "password" && <Link
                        underline="hover"
                        color="neutral"
                        href="#some-link"
                        fontSize={12}
                        fontWeight={500}
                    >
                        Change password
                    </Link>}
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
                        setShowContent("profile")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={0}>
                            Personal info
                        </Tab>
                    </Box>
                    <Box onClick={() => {
                        setShowContent("password")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={1}>
                            Password change
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
        >  {isLoading ? <Stack sx={{alignItems: 'center'}}><CircularProgress
                color='inherit'
                size='5rem'
            /> </Stack> :
            <Card>
                <Box sx={{mb: 1}}>
                    <Typography
                        level="title-md">{showContent === "profile" ? `Personal info` : `Password change`}</Typography>
                    {showContent === "profile" && <Typography level="body-sm">
                        Customize how your profile information.
                    </Typography>}
                </Box>
                <Divider/>
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{display: {xs: 'none', md: 'flex'}, my: 1}}
                >
                    {showContent === "profile" ? getUserForm() : getPasswordForm()}
                </Stack>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
                >
                    {showContent === "profile" ? getUserForm() : getPasswordForm()}
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
                            {showContent === "profile" &&  <Button size="sm" variant="outlined" color="danger">
                                {isLoadingSmall ? (
                                    <CircularProgress
                                        color='inherit'
                                        size='1.5rem'
                                    />
                                ) : (
                                    'Delete'
                                )}
                            </Button>}
                        </CardActions>
                        <CardActions alignSelf={'center'}>
                            {showContent === "profile" && <Button onClick={() => {
                                getUserWithoutLoading()
                            }} size="sm" variant="outlined" color="neutral">
                                {isLoadingSmall ? (
                                    <CircularProgress
                                        color='inherit'
                                        size='1.5rem'
                                    />
                                ) : (
                                    `Reset`
                                )}
                            </Button>}
                            <Button onClick={() => {
                                handleUpdateUserSubmit()
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
            </Card>}
        </Stack>
    </Box>

}

export {Profile};