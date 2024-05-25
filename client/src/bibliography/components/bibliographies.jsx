import {useEffect, useState} from "react";
import {getLessonsForTeacherForTime} from "../../lesson/lesson-service.js";
import {
    AspectRatio,
    Box,
    Breadcrumbs, Button,
    Card, CardActions,
    CardOverflow,
    Divider, FormControl, FormLabel, IconButton, Input,
    Link,
    Stack,
    Tab,
    tabClasses,
    TabList,
    Tabs, Tooltip,
    Typography
} from "@mui/joy";

import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded.js";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded.js";
import {CircularProgress} from "@mui/material";
import * as React from "react";
import {baseUrl, server} from "../../serverConn.jsx";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded.js";
import CardContent from "@mui/joy/CardContent";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded.js";
import {getBibliograhiesForTeacher, deleteBibliography} from "../bibliography-service.js";
import {useNavigate} from "react-router-dom";

const Bibliographies = () => {
    const navigate = useNavigate();
    const [biblios, setBiblios] = useState([])
    const [isBibliosLoading, setIsBibliosLoading] = useState(true)
    const [isBibliosDeleting, setIsBibliosDeleting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        getTeacherBiblios()
    }, [])

    const getTeacherBiblios = () => {
        setError('')
        setIsBibliosLoading(true)
        getBibliograhiesForTeacher((res) => {
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

    const deleteBiblio = (id) => {
        setError('')
        setIsBibliosDeleting(true)
        deleteBibliography(id, (res) => {
                setIsBibliosDeleting(false)
                getTeacherBiblios()
            },
            (err) => {
                setIsBibliosDeleting(false)
                console.log(err);
                setError(err);
            }
        )
    }


    const getBiblioForm = () => {
        return <Stack width={'100%'} direction="column" justifyContent='center' spacing={1}>
            {biblios?.map((biblio, index) => <Card
                variant="outlined"
                orientation="horizontal"
            >
                <IconButton
                    onClick={() => {
                        window.open(`${baseUrl}${biblio.url}`)
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
                    <Typography level="body-sm" fontSize="sm">{biblio.name}</Typography>
                    <Typography level="body-sm" fontSize="sm">{biblio.author}</Typography>
                </CardContent>
                {isBibliosDeleting ?
                    <CircularProgress
                        color='inherit'
                        size='1.5rem'
                    /> : <IconButton onClick={() => {
                        deleteBiblio(biblio.id)
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
                        <AutoStoriesRoundedIcon/>
                    </Link>
                    <Link
                        underline="hover"
                        color="neutral"
                        href="#some-link"
                        fontSize={12}
                        fontWeight={500}
                    >
                        Bibliographies
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
                maxWidth: '800px',
                mx: 'auto',
                px: {xs: 2, md: 6},
                py: {xs: 2, md: 3},
            }}
        >
            <Card>
                <Box sx={{mb: 1}}>
                    <Typography level="title-md">Your materials</Typography>
                    <Typography level="body-sm">
                        Manage your lessons materials.
                    </Typography>
                </Box>
                <Divider/>
                {isBibliosLoading ? <Stack sx={{alignItems: 'center'}}><CircularProgress
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
            </Card>
        </Stack>
    </Box>
}

export {Bibliographies}