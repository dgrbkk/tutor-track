import {useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, {tabClasses} from "@mui/joy/Tab";
import Stack from "@mui/joy/Stack";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {StudentForm, BibliographyForm, LessonForm, StudentMaterialForm} from '../common/components.js'

const Forms = () => {
    const {pathname} = useLocation();

    const getCurrentForm = useCallback(() => {
        switch (pathname) {
            case '/student-add': {
                return <StudentForm/>;
            }
            case '/bibliography-add': {
                return <BibliographyForm/>;
            }
            case '/lesson-add': {
                return <LessonForm/>;
            }
            case '/material-add': {
                return <StudentMaterialForm/>;
            }
            default: {
                return <StudentForm/>;
            }
        }
    }, [pathname]);

    return (<Box sx={{flex: 1, width: '100%'}}>
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
                            href="client/src#some-link"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon/>
                        </Link>
                        <Link
                            underline="hover"
                            color="neutral"
                            href="client/src#some-link"
                            fontSize={12}
                            fontWeight={500}
                        >
                            Add
                        </Link>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            {(pathname.slice(1, -4)).charAt(0).toUpperCase() + (pathname.slice(1, -4)).slice(1)}
                        </Typography>
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
                {getCurrentForm()}
            </Stack>
        </Box>)
    ;
};

export {Forms};
