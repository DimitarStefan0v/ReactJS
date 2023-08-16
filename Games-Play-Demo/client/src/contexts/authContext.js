import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';


export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {});

    const authService = authServiceFactory(auth.accessToken);

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            console.log('Password and confirm password don\'t match');
            return;
        }

        try {
            const result = await authService.register(registerData);

            setAuth(result);

            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    const onLogout = async () => {
        // TODO: authorized request
        // await authService.logout();

        setAuth({});

        navigate('/');
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};