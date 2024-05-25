import {Navigate, Outlet, useOutletContext} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getTeacherInfo} from "../auth/auth-service.js";

const ProtectedRoute = () => {
    const {
        user: [user, setUser],
        students: [students, setStudents],
    } = useOutletContext();

    const [showContent, setShowContent] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            setShowContent(true);
        }, 500);
    }, []);

    return <>{user ? <Outlet context={{
            user: [user, setUser],
            students: [students, setStudents],
        } }/>
        :
        <Navigate
            to='/login'
        />
    }</>
}

export {ProtectedRoute};
