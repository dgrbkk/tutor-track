
import { Outlet, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/joy/CssBaseline';
import { Header } from './common/header.jsx';
import { Sidebar } from './common/sidebar.jsx';
import { CssVarsProvider } from '@mui/joy/styles';
import { Box } from '@mui/joy';
import GlobalStyles from "@mui/joy/GlobalStyles";
import {useEffect, useState} from "react";
import {getTeacherInfo} from "./auth/auth-service.js";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      if (!user) {
          getUser()
      } else {
          setIsLoading(false)
      }
  }, [])

  const getUser = () => {
      setIsLoading(true)
    getTeacherInfo( (res) => {
          setUser(res.data)
          console.log(res.data)
          setIsLoading(false)
        },
        (err) => {
          setIsLoading(false)
          console.log(err);
        }
    )
  }


  return (
    <div>
      {pathname !== '/login' && pathname !== '/register' ? (
        <div>
          <GlobalStyles
              styles={{
                ':root': {
                  '--Form-maxWidth': '800px',
                  '--Transition-duration': '0.4s', // set to `none` to disable transition
                },
              }}
          />
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
              <Header />
              <Sidebar user={user} setUser={setUser} students={students} setStudents={setStudents}/>
              <Box
                component='main'
                className='MainContent'
                sx={{
                  pt: { xs: 'calc(12px + var(--Header-height))', md: 4 },
                  pb: { xs: 2, sm: 2, md: 3 },
                  mt: { xs: 5 },
                  flex: 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'start',
                  flexDirection: 'row',
                  minWidth: 0,
                  height: '100dvh',
                  gap: 1,
                  overflow: 'auto',
                }}
              >
                {!isLoading &&
                <Outlet context={{
                    user: [user, setUser],
                    students: [students, setStudents],
                }}/>
                }
              </Box>
            </Box>
          </CssVarsProvider>
        </div>
      ) : (
        <Outlet context={{
            user: [user, setUser],
            students: [students, setStudents],
        }}/>
      )}
    </div>
  );
}

export default App;
