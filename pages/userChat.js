import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';

import StatementChat from './statementChat'
import QuestionChat from './questionChat'
import Profil from './profil'

import { gun, user2 } from './_app'


// create the initial state to hold the messages
const initialState = {
    messages: []
}

// Create a reducer that will update the messages array
function reducer(state, message) {
    return {
        messages: [message, ...state.messages]
    }
}

const RinitialState = {
    Rmessages: []
}

// Create a reducer that will update the messages array
function Rreducer(Rstate, Rmessage) {
    if (Rmessage == '') {
        return {
            Rmessages: []
        }
    } else {
        return {
            Rmessages: [Rmessage, ...Rstate.Rmessages]
        }
    }

}

const likes = [];

function likesZero() {
    return likes = []
}

export default function UserChat(props) {

    const [profilName, setProfilName] = useState('');
    const [profil, setProfil] = useState(false);
    const [username, setUsername] = useState("");


    const [chat, setChat] = useState(false);


    function changeState() {
        if (chat == false) {
            setChat(true)
        }
    }

    function changeQuest() {
        if (chat == true) {
            setChat(false)
        }
    }



    function profiler(prop) {
        if (profil == false) {
            setProfil(true);
            setProfilName(prop);
        } else {
            setProfil(false);
            setProfilName('');
        }

    }

    useEffect(() => {
        user2.get('alias').on(v => setUsername(v));
    }, [])

    return (
        <>
            {profil ? (
                <>
                    < Profil back={profiler} username={profilName} chat={true} />
                </>

            ) : (
                    <>
                        <button onClick={changeQuest}>Fragen</button>
                        <button onClick={changeState}>Statements</button>
                        {
                            chat ? (
                                <>
                                    <StatementChat profils={prop => profiler(prop)} chatToken={props.chatToken} />
                                </>
                            ) : (
                                    <>
                                        <QuestionChat profils={prop => profiler(prop)} chatToken={props.chatToken} />
                                    </>
                                )
                        }

                    </>
                )
            }
        </>
    );

}