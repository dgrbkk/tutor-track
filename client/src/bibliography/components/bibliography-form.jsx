import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";

import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {useRef, useState} from "react";
import {bibliographyCreationAndUpload} from "../bibliography-service.js";
import {object, string} from "yup";
import {useFormik} from "formik";
import FormHelperText from "@mui/joy/FormHelperText";
import {CircularProgress} from "@mui/material";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';


import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';


const BibliographyForm = () => {
    const navigate = useNavigate();
    const inputPdf = useRef(null)
    const form = useRef(null)

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [pdfData, setPdfData] = useState(null)

    const handleCreateBibliographySubmit = (event) => {
        event.preventDefault();
        setError('');

        createBibliography();
    };

    const handlePdfSubmit = (event) => {
        setError('')

        const pdfDta = new FormData();
        const file = event.currentTarget.files[0];

        pdfDta.append("pdf", file);

        console.log(pdfDta.get('pdf'))
        setPdfData(pdfDta)
        const nameFile = pdfDta.get('pdf').name
        setName(nameFile.slice(0, nameFile.length - 4))
    }

    const handlePdfRemove = () => {
        setPdfData(null)
        setName("")
        setAuthor("")

    }

    const createBibliography = () => {
        setIsLoading(true);
        const data = {author: author, name: name, "pdf": pdfData?.get('pdf')};
        bibliographyCreationAndUpload(
            data,
            () => {
                setIsLoading(false);
                navigate('/bibliographies')
            },
            (err) => {
                console.log(err);
                setError(err);
                setIsLoading(false);
            }
        );
    }


    const getBibliographyForm = () => {
        return <Box
            sx={(theme) => ({
                width: {xs: '100%', md: '50vw'},
                transition: 'width var(--Transition-duration)',
                transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255 255 255)',
                [theme.getColorSchemeSelector('dark')]: {
                    backgroundColor: 'rgba(19 19 24 / 0.4)',
                },
            })}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100dvh',
                    width: '100%',
                    px: 2,
                }}
            >
                <Box
                    component="main"
                    sx={{
                        my: 'auto',
                        py: 2,
                        pb: 5,
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 700,
                        maxWidth: '100%',
                        mx: 'auto',
                        borderRadius: 'sm',
                        '& form': {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        },
                        [`& .MuiFormLabel-asterisk`]: {
                            visibility: 'hidden',
                        },
                    }}
                >
                    <Stack gap={4} sx={{mb: 2}}>
                        <Stack gap={1}>
                            <Typography component="h1" level="h3">
                                Add new bibliography
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack gap={4} sx={{mt: 2}}>
                        <form ref={form} id={"form"}
                            onSubmit={handleCreateBibliographySubmit}
                        >
                            <input ref={inputPdf} type="file" accept="application/pdf"
                                   onChange={handlePdfSubmit} hidden/>
                            {pdfData?.get('pdf') ? <Card
                                variant="outlined"
                                orientation="horizontal"
                            >
                                <AspectRatio
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
                                </AspectRatio>
                                <CardContent>
                                    <Typography fontSize="sm">{pdfData?.get('pdf').name}</Typography>
                                </CardContent>
                                <IconButton onClick={(e) => handlePdfRemove(e)} variant="plain" color="danger" size="sm"
                                            sx={{mt: -1, mr: -1}}>
                                    <RemoveCircleOutlineRoundedIcon/>
                                </IconButton>
                            </Card> : <Card
                                variant="soft"
                                sx={[
                                    {
                                        borderRadius: "sm",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        alignItems: "center",
                                        px: 3,
                                        flexGrow: 1,
                                        boxShadow: "none"
                                    }
                                ]}
                            >
                                <AspectRatio
                                    ratio="1"
                                    variant="solid"
                                    color="primary"
                                    sx={{
                                        minWidth: 32,
                                        borderRadius: "50%",
                                        "--Icon-fontSize": "16px"
                                    }}
                                >
                                    <div onClick={() => inputPdf.current.click()}>{<FileUploadRoundedIcon/>}</div>
                                </AspectRatio>
                                <Typography level="body-sm" textAlign="center">
                                    <Link onClick={() => inputPdf.current.click()} component="button" overlay>
                                        Click to upload
                                    </Link>{" "}
                                    or drag and drop
                                    <br/> SVG, PNG, JPG or GIF (max. 800x400px)
                                </Typography>
                            </Card>}
                            <Box sx={{display: 'flex', gap: 2}}>
                                <FormControl sx={{width: '50%'}} required>
                                    <FormLabel>Name *</FormLabel>
                                    <Input type="text" name="name"
                                           value={name}
                                           onChange={(e) => {
                                               setName(e.currentTarget.value)
                                           }}
                                    />
                                </FormControl>
                                <FormControl sx={{width: '50%'}}>
                                    <FormLabel>Author </FormLabel>
                                    <Input type="text" name="author" value={author}
                                           onChange={(e) => {
                                               setAuthor(e.currentTarget.value)
                                           }}
                                    />
                                </FormControl>
                            </Box>
                            <Stack gap={4} sx={{mt: 1}}>
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
                                <Button
                                    type='submit'
                                    fullWidth
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <CircularProgress
                                            color='inherit'
                                            size='1.5rem'
                                        />
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Box>
        </Box>
    }

    return <>
        <Stack
            direction="row"
            spacing={3}
            sx={{display: {xs: 'none', md: 'flex'}, my: 1}}
        >
            {getBibliographyForm()}
        </Stack>
        <Stack
            direction="column"
            spacing={2}
            sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
        >
            {getBibliographyForm()}
        </Stack>
    </>
}

export {BibliographyForm}