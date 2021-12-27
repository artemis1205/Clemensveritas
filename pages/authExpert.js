import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';
import { gun, user2 } from './_app'



export default function authExpert() {

    const [user, setUser] = useState({
        name: '', password: ''
    })

    const [loggedIn, setLoggedIn] = useState(false);

    const [expert, setExpert] = useState('');

    function login(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function search(e) {
        setExpert(e.target.value)
    }

    function logUser() {

        if (user.name == 'ehrenlos' && user.password == '12345678') {
            setLoggedIn(true)
            console.log("true")
        } else {
            setLoggedIn(false)
        }


    };


    function getExpert() {
        console.log(expert)
        console.log("läuft")
        gun.get('user3').map().once(function (m) {
            if (expert === m.name) {
                console.log(m);
                const key = m._['#'];
                const value = true;
                gun.get('user3').get(`${key}`).put({ expert: value })
            }
        })
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

            {loggedIn ? (
                <>
                    <input
                        onChange={search}
                        placeholder="Name"
                        name="name"
                        value={expert}
                    />
                    <button onClick={getExpert}>Create Expert</button>
                </>

            ) : (
                    <>
                    </>
                )}
        </>
    )
}