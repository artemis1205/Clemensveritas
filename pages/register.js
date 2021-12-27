import Auth from './userChat';
import App from './_app';
import { useEffect, useState, useReducer } from 'react'
import 'gun/sea';
import 'gun/axe';

import { gun, user2 } from './_app'


const initialState = {
    messages: []
}

// Create a reducer that will update the messages array
function reducer(state, message) {
    return {
        messages: [message, ...state.messages]
    }
}


export default function Register(props) {

    const [state, dispatch] = useReducer(reducer, initialState);



    const [createAuth, setCreateAuth] = useState({
        name: '', password: ''
    })

    const [credentials, setCredentials] = useState({
        nachname: '', vorname: '', geburtstag: '', wohnort: '', plz: '', strasse: '', strassennummer: '', land: '', name: '', expert: false, telnummer: '', email: '', profilpic: '', subscription: ''
    })



    function onChange(e) {
        setCreateAuth({ ...createAuth, [e.target.name]: e.target.value })
    }

    function onCredentials(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    function createUser() {

        if (credentials.nachname != '' && credentials.vorname != '' && credentials.geburtstag != '' && credentials.wohnort != '' && credentials.plz != '' && credentials.strasse != '' && credentials.strassennummer != '' && credentials.telnummer != '' && credentials.email != '', createAuth.name != '') {
            user2.create(createAuth.name, createAuth.password);

            gun.get('user3').set({
                nachname: credentials.nachname,
                vorname: credentials.vorname,
                geburtstag: credentials.geburtstag,
                wohnort: credentials.wohnort,
                plz: credentials.plz,
                strasse: credentials.strasse,
                strassennummer: credentials.strassennummer,
                land: credentials.land,
                name: createAuth.name,
                expert: false,
                telnummer: credentials.telnummer,
                email: credentials.email,
                profilpic: '',
                subscription: 'none'

            })
        }


        setCredentials({
            nachname: '', vorname: '', geburtstag: '', wohnort: '', plz: '', strasse: '', strassennummer: '', land: '', name: '', expert: false, telnummer: '', email: '', profilpic: ''
        })


    };




    return (
        <>



            <label>Benutzername</label>
            <input
                onChange={onChange}
                placeholder="Name"
                name="name"
                value={createAuth.name}
            />
            <label>Passwort</label>
            <input
                onChange={onChange}
                placeholder="Password"
                name="password"
                value={createAuth.password}
            />
            <label>Nachname</label>
            <input
                onChange={onCredentials}
                placeholder="Nachname"
                name="nachname"
                value={credentials.nachname}
            />
            <label>Vorname</label>
            <input
                onChange={onCredentials}
                placeholder="Vorname"
                name="vorname"
                value={credentials.vorname}
            />
            <label>Geburtstag</label>
            <input
                onChange={onCredentials}
                placeholder="Geburtstag"
                name="geburtstag"
                value={credentials.geburtstag}
            />
            <label>Wohnort</label>
            <input
                onChange={onCredentials}
                placeholder="Wohnort"
                name="wohnort"
                value={credentials.wohnort}
            />
            <label>PLZ</label>
            <input
                onChange={onCredentials}
                placeholder="PLZ"
                name="plz"
                value={credentials.plz}
            />
            <label>Strasse</label>
            <input
                onChange={onCredentials}
                placeholder="Strasse"
                name="strasse"
                value={credentials.strasse}
            />
            <label>Strassennummer</label>
            <input
                onChange={onCredentials}
                placeholder="Strassennummer"
                name="strassennummer"
                value={credentials.strassennummer}
            />
            <label>Land</label>
            <input
                onChange={onCredentials}
                placeholder="Land"
                name="land"
                value={credentials.land}
            />
            <label>Telefonnummer</label>
            <input
                onChange={onCredentials}
                placeholder="Telefonnummer"
                name="telnummer"
                value={credentials.telnummer}
            />
            <label>Email</label>
            <input
                onChange={onCredentials}
                placeholder="Email"
                name="email"
                value={credentials.email}
            />


            <button onClick={createUser}>Create User</button>

            <button onClick={props.switche}>Login</button>


        </>

    );



}