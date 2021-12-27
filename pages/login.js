
import Chat from './userChat';
import Register from './register';

import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun/gun';
import 'gun/sea';

import { gun, user2 } from './_app'




export default function Login(props) {

    const [username, setUsername] = useState();

    const [user, setUser] = useState({
        name: '', password: ''
    })

    function logUser() {

        user2.auth(user.name, user.password);


        gun.on('auth', async (event) => {
            const alias = await user2.get('alias'); // username string


            console.log(`signed in as ${alias}`);
            user2.get('alias').on(v => setUsername(v))
            window.location.reload(false);
        });


    };

    useEffect(() => {
        user2.get('alias').on(v => setUsername(v));
    }, [])


    function onChange(e) {
        setCreateAuth({ ...createAuth, [e.target.name]: e.target.value })
    }

    function login(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }




    return (

        <>


            <input
                onChange={login}
                placeholder="Name"
                name="name"
                value={user.name}
            />
            <input
                onChange={login}
                placeholder="Password"
                name="password"
                value={user.password}
            />
            <button onClick={logUser}>Log in</button>
            <button onClick={props.switche}>Registrieren</button>
        </>




    );


}



