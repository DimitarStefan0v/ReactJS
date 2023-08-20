import { useContext, useEffect } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const Logout = () => {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => {
        onLogout()
    }, [onLogout])

    return;
};