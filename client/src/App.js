import { useEffect, useState } from 'react';

import * as userService from './services/userService';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import { UserList } from './components/UserList';

import './App.css';

function App() {
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        userService.getAll()
            .then(setUsers)
            .catch(err => {
                console.log('Error: ' + err);
            });
    }, []);

    const onUserCreateSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const createdUser = await userService.create(data);
        setUsers(state => [...state, createdUser]);
    };

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />
                    <UserList users={users} onUserCreateSubmit={onUserCreateSubmit} />

                </section>
            </main>

            <Footer />
        </>
    );
}

export default App;
