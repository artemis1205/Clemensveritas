import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';

import Profil from './profil';


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



export default function Reply(props) {

    const [username, setUsername] = useState("");

    const [mainMess, setMainMess] = useState({
        key: '', name: '', titel: '', message: '', createdAt: ''
    })

    const [form, setForm] = useState('');

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {


        gun.get(props.chToken).map().once(function (m) {

            if (m._['#'] == props.keys) {

                setMainMess({
                    key: (m._['#']),
                    name: m.name,
                    titel: m.titel,
                    message: m.message,
                    createdAt: m.createdAt
                })


            }
        })




    }, [])



    function saveMessage() {
        console.log(form);

        const messages = gun.get(mainMess.key);
        if (form != "") {
            messages.set({
                name: username,
                message: form,
                createdAt: Date.now()
            })
            setForm('')
        }



    }

    useEffect(() => {

        console.log("key: ", props.keys)

        gun.get(props.keys).map().once(function (m) {

            if (typeof m.message === 'string') {
                dispatch({
                    key: m._['#'],
                    name: m.name,
                    message: m.message,
                    createdAt: m.createdAt
                })
            }
        })


    }, [])

    useEffect(() => {
        user2.get('alias').on(v => setUsername(v));
    }, [])

    function onChange(e) {
        setForm(e.target.value)
    }



    return (
        <>
            <button onClick={props.back}>Zurück</button>


            <h1>{mainMess.titel}</h1>
            <h2>{mainMess.message}</h2>

            <textarea
                onChange={onChange}
                placeholder="Antwort"
                name="reply"
                value={form}
            />
            <button onClick={saveMessage}>Send</button>

            {
                state.messages.map(message => (
                    <div key={message.createdAt}>

                        <h3>{message.message}</h3>
                        <button onClick={() => props.profils(message.name)}>From: {message.name}</button>
                        <p>Date: {message.createdAt}</p>
                        <br />

                    </div>

                ))
            }
        </>
    )
}