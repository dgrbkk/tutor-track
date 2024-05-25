import {IconButton, Sheet, Table, Chip} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import {CircularProgress} from "@mui/material";
import CardOverflow from "@mui/joy/CardOverflow";
import Box from "@mui/joy/Box";
import * as React from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded.js";
import Typography from "@mui/joy/Typography";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded.js";
import {useNavigate} from "react-router-dom";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded.js";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded.js";

const LessonsTable = ({loading, lessons, error, student}) => {
    const navigate = useNavigate();

    return <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
            display: {xs: 'none', sm: 'initial'},
            width: "1100px",
            borderRadius: 'sm',
            flexShrink: 1,
            minHeight: 0,
            overflow: 'clip'
        }}
    >
        {loading ? <Stack sx={{alignItems: 'center'}}><CircularProgress
            color='inherit'
            size='4rem'
        /> </Stack> : <><Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
                '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                '--Table-headerUnderlineThickness': '1px',
                '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                '--TableCell-paddingY': '4px',
                '--TableCell-paddingX': '8px',
            }}
        >
            <thead>
            <tr>
                <th style={{width: 70, textAlign: 'center', padding: '12px 6px'}}>
                    Status
                </th>
                <th style={{width: 160, textAlign: 'center', padding: '12px 6px'}}>
                    Date and time
                </th>
                {!student && <th style={{width: 200, textAlign: 'center', padding: '12px 6px'}}>Student</th>}
                <th style={{width: 240, textAlign: 'center', padding: '12px 6px'}}>Topic</th>
                <th style={{width: 120, textAlign: 'center', padding: '12px 6px'}}>Rating</th>
                {student && <th style={{width: 200, textAlign: 'center', padding: '12px 6px'}}>Homework check</th>}
                <th style={{width: 160, textAlign: 'center', padding: '12px 6px'}}>Payment</th>
                <th style={{width: 140, textAlign: 'center', padding: '12px 6px'}}></th>
            </tr>
            </thead>
            <tbody>
            {lessons?.map((lesson) => (
                <tr key={lesson.id}>
                    <td style={{textAlign: 'center', width: 70}}>
                        {lesson?.status && <DoneOutlineRoundedIcon/>}
                    </td>
                    <td style={{textAlign: 'center', width: 120}}>
                        <Typography level="body-s"> {new Date(lesson?.date).toLocaleString('en-GB',
                            {timeZone: "Etc/GMT"})}</Typography>
                    </td>
                    {!student && <td style={{textAlign: 'center', width: 200}}>
                        {lesson?.student?.firstName} {lesson?.student?.lastName}
                    </td>}
                    <td style={{textAlign: 'center', width: 240}}>
                        <Typography sx={{overflow: 'clip'}} level="body-s">{lesson?.topic}</Typography>
                    </td>
                    <td style={{textAlign: 'center', width: 120}}>
                        <Typography level="body-s">{lesson?.rating}</Typography>
                    </td>
                    {student && <td style={{textAlign: 'center', width: 200}}>
                        {lesson?.homeworkCheck && <DoneOutlineRoundedIcon/>}
                    </td>}
                    <td style={{textAlign: 'center', width: 260}}>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: 140
                        }}>
                            <Typography
                                sx={{
                                    ml: 1, justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}>{lesson?.payment?.status ? <Chip
                                variant="soft"
                                size="lg"
                                startDecorator={<CheckRoundedIcon/>}
                                color={'success'}
                            >
                                {lesson?.payment?.price} hrn
                            </Chip> : <Chip
                                variant="soft"
                                size="lg"
                                startDecorator={<AutorenewRoundedIcon/>}
                                color={'danger'}
                            >
                                {lesson?.payment?.price} hrn
                            </Chip>}</Typography>
                        </Box>
                    </td>
                    <td style={{textAlign: 'center', width: 120}}>
                        <IconButton
                            onClick={() => {
                                navigate(`/lesson/${lesson?.id}`, {
                                    state: {
                                        lesson: lesson,
                                    }
                                })
                            }}
                            aria-label="upload new picture"
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            sx={{
                                bgcolor: 'background.body',
                                zIndex: 2,
                                borderRadius: '50%',
                                boxShadow: 'sm',
                            }}
                        >
                            <OpenInNewRoundedIcon/>
                        </IconButton>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
            <CardOverflow sx={{justifyContent: 'center'}}>
                {error && <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: "darkRed"
                    }}
                >
                    {Array.isArray(error) ? error[0] : error}
                </Box>}
            </CardOverflow>
        </>}
    </Sheet>
}
export {LessonsTable}