import * as React from "react";
import {
    Typography,
    Box,
    IconButton,
    Avatar
} from "@mui/joy";


import { useCallback } from 'react';
import {useLocation} from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';

import { SignInForm, SignUpForm } from '../common/components.js';
import authBackground from '../assets/auth-bg.jpg';
import logo from '../assets/logo.jpg';



const Auth = () => {
  const { pathname } = useLocation();
  const getCurrentForm = useCallback(() => {
    switch (pathname) {
      case '/login': {
        return <SignInForm />;
      }
      case '/register': {
        return <SignUpForm />;
      }
      default: {
        return <SignInForm />;
      }
    }
  }, [pathname]);

  return (
    <CssVarsProvider
      defaultMode='dark'
      disableTransitionOnChange
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
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
            component='header'
            sx={{
              py: 3,
              display: 'flex',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center', alignSelf: 'end' }}>
                <Avatar
                    variant="outlined"
                    size="lg"
                    src={logo}
                />
              <Typography level='title-lg'>Rozum hub</Typography>
            </Box>
          </Box>
          <Box
            component='main'
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
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
            {getCurrentForm()}
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${authBackground})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
    </CssVarsProvider>
  );
};

export { Auth };
