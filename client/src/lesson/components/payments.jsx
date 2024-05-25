import {
    Input,
    Stack,
    Tabs,
    Breadcrumbs,
    Link,
    tabClasses,
    Tab,
    TabList,
    FormLabel,
    FormControl,
    Box,
} from "@mui/joy";

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {getPaymentsForTeacherForTime, getDebtForTeacher} from "../payment-service.js";
import {PaymentsTable} from "./payments-table.jsx";
import {DebtTable} from "./debt-table.jsx";


const Payments = () => {

    const nowDay = new Date()
    const [paymentMonth, setPaymentMonth] = useState(nowDay.toISOString().split('T')[0].slice(0, -3))
    const [error, setError] = useState('')
    const [isDebtLoading, setIsDebtLoading] = useState(true)
    const [isPaymentsLoading, setIsPaymentsLoading] = useState(true)
    const [debt, setDebt] = useState([])
    const [payments, setPayments] = useState([])
    const [totals, setTotals] = useState()
    const [debtTotal, setDebtTotal] = useState()
    const [showContent, setShowContent] = useState("payment")


    useEffect(() => {
        console.log(totals)
    }, [totals])

    useEffect(() => {
        getTeacherPayments()
    }, [paymentMonth])

    useEffect(() => {
        getTeacherDebt()
    }, [])

    const getTeacherPayments = () => {
        setError('')
        setIsPaymentsLoading(true)
        getPaymentsForTeacherForTime({
                start: `${paymentMonth}-01T07:00`,
                end: new Date(parseInt(paymentMonth.slice(0, 4)), parseInt(paymentMonth.slice(5, 7)), 0, 23).toISOString()
            }, (res) => {
            console.log(res.data.payments)
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

    const getTeacherDebt = () => {
        setError('')
        setIsDebtLoading(true)
        getDebtForTeacher((res) => {
                setDebt(res.data.paymentsUnpaid)
                setDebtTotal(res.data.total)
                setIsDebtLoading(false)
            },
            (err) => {
                console.log(err);
                setIsDebtLoading(false)
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
                        Payments
                    </Link>
                    {showContent === "debt" && <Link
                        underline="hover"
                        color="neutral"
                        href="#some-link"
                        fontSize={12}
                        fontWeight={500}
                    >
                       Debt
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
                        setShowContent("payment")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={0}>
                            Payments
                        </Tab>
                    </Box>
                    <Box onClick={() => {
                        setShowContent("debt")
                    }}>
                        <Tab sx={{borderRadius: '6px 6px 0 0'}} indicatorInset value={1}>Debt
                        </Tab>
                    </Box>
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
                    {showContent === "debt" && <DebtTable error={error} loading={isDebtLoading} payments={debt} totals={debtTotal}/>}
                    {showContent === "payment" && <PaymentsTable error={error} loading={isPaymentsLoading} totals={totals} payments={payments}/>}
                </Box>
            </Stack>
    </Box>

}

export {Payments};