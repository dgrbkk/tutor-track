import {IconButton, Sheet, Table} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import {CircularProgress} from "@mui/material";
import CardOverflow from "@mui/joy/CardOverflow";
import Box from "@mui/joy/Box";
import * as React from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded.js";
import Typography from "@mui/joy/Typography";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded.js";
import {useNavigate} from "react-router-dom";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded.js";
import Chip from "@mui/joy/Chip";

const DebtTable = ({loading, payments, error, totals}) => {
    const navigate = useNavigate();

    return <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
            display: {xs: 'none', sm: 'initial'},
            width: "1000px",
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
                    Lesson
                </th>
                <th style={{width: 120, textAlign: 'center', padding: '12px 6px'}}>
                    Price
                </th>
                <th style={{width: 200, textAlign: 'center', padding: '12px 6px'}}>Student</th>
                <th style={{width: 240, textAlign: 'center', padding: '12px 6px'}}>Payment notes</th>
                <th style={{width: 220, textAlign: 'center', padding: '12px 6px'}}>Date and time of lesson</th>
                <th style={{width: 140, textAlign: 'center', padding: '12px 6px'}}></th>
            </tr>
            </thead>
            <tbody>
            {payments?.map((payment) => (
                <tr key={payment.id}>
                    <td style={{textAlign: 'center', width: 70}}>
                        {payment?.lesson?.status && <DoneOutlineRoundedIcon/>}
                    </td>
                    <td style={{textAlign: 'center', width: 120}}>
                        <Typography sx={{overflow: 'clip'}} level="body-s">{payment?.price} hrn</Typography>
                    </td>
                    <td style={{
                        width: 200,
                        textAlign: 'center',
                        padding: '12px 6px'
                    }}>{payment?.lesson?.student?.firstName} {payment?.lesson?.student?.lastName}</td>
                    <td style={{textAlign: 'center', width: 240}}>
                        <Typography sx={{overflow: 'clip'}} level="body-s">{payment?.paymentNotes}</Typography>
                    </td>
                    <td style={{textAlign: 'center', width: 220}}>
                        {payment?.lesson?.date &&
                            <Typography level="body-s"> {new Date(payment?.lesson?.date).toLocaleString('en-GB',
                                {timeZone: "Etc/GMT"})}</Typography>}
                    </td>
                    <td>
                        <IconButton
                            onClick={() => {
                                navigate(`/lesson/${payment?.lessonId}`, {
                                    state: {
                                        page: "payment",
                                        payment: payment
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
            {payments && <Box
                sx={{
                    p: 1,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                }}
            >
                <Chip
                    variant="soft"
                    size="lg"
                    color={'danger'}
                > Unpaid: {totals} </Chip>
            </Box>}
            <CardOverflow sx={{justifyContent: 'center'}}>
                {error && <Box
                    sx={{
                        p: 1,
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
export {DebtTable}