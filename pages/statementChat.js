import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';

import Reply from './reply';
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

const likeCount2 = [];
function likeCountZero() {
    return likeCount2 = []
}



export default function StatementChat(props) {

    const [replie, setReplie] = useState(false);

    const [key, setKey] = useState('');

    const [username, setUsername] = useState("");

    const [showReplies, setShowReplies] = useState(false)

    const [showReplie, setShowReplie] = useState('')

    // the form state manages the form input for creating a new message
    const [form, setForm] = useState({
        titel: '', message: ''
    });

    const [likeAnz, setLikeAnz] = useState(0)

    // initialize the reducer & state for holding the messages array
    const [state, dispatch] = useReducer(reducer, initialState);

    const [Rstate, Rdispatch] = useReducer(Rreducer, RinitialState);






    // when the app loads, fetch the current messages and load them into the state
    // this also subscribes to new data as it changes and updates the local state
    useEffect(() => {

        gun.get(props.chatToken + 'S').map().once(function (m) {
            if (typeof m.name === 'string' && m.titel != '') {
                dispatch({
                    key: m._['#'],
                    name: m.name,
                    titel: m.titel,
                    message: m.message,
                    likeAnz: m.likeAnz,
                    createdAt: m.createdAt
                })
            }
        })
    }, [])

    useEffect(() => {
        user2.get('alias').on(v => setUsername(v));
    }, [])



    // set a new message in gun, update the local state to reset the form field
    function saveMessage() {


        const messages = gun.get(props.chatToken + 'S');
        if (form != "") {
            messages.set({
                name: username,
                titel: form.titel,
                message: form.message,
                likeAnz: 0,
                createdAt: Date.now()
            })
            setForm({ titel: '', message: '' })
        }

    }

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function replySwitch(a) {
        setKey(a);

        console.log(a);

        if (replie == false) {
            setReplie(true)
        } else {
            setReplie(false)
        }

    }



    function switchReplies(b) {
        console.log("useEffect key: ", b);

        if (showReplies == false) {
            setShowReplies(true)
            setShowReplie(b)
            gun.get(b).map().once(function (m) {
                console.log("data. ", m.message, m.name)
                if (m.message != null && m.name != null) {
                    Rdispatch({
                        key: m._['#'],
                        name: m.name,
                        message: m.message,
                        createdAt: m.createdAt
                    })
                }

            })

        } else {
            setShowReplies(false);
            setShowReplie('');
            Rdispatch('')

        }

    }



    function setLike(k) {

        const messageLikes = gun.get(k + 'likes');


        messageLikes.map().once(function (m) {
            console.log(m);

            if (m.username === username) {
                console.log(m.username, username, m.like)
                likes.push(false)

                const key = m._['#'];
                if (m.like == false) {
                    messageLikes.get(`${key}`).put({ like: true })
                    likeCount2.push(true);
                } else {
                    messageLikes.get(`${key}`).put({ like: false })
                }
            } else {
                likes.push(true)
                if (m.like == true) {
                    likeCount2.push(true);
                }


            }

        })

        setTimeout(function () {
            const likeZ = likeCount2.length;
            console.log("count Real: ", likeCount2);
            const allEqual = arr => arr.every(v => v === true)
            console.log(likes)
            const check = allEqual(likes);

            if (check == true) {
                messageLikes.set({
                    like: true,
                    username: username
                })


            }
            gun.get(props.chatToken + 'S').map().once(function (m) {

                if (m._['#'] === k) {

                    console.log(likeZ);
                    gun.get(props.chatToken + 'S').get(`${k}`).put({ likeAnz: likeZ })
                }
            })
            console.log(check)




            likesZero();
            likeCountZero()
        }, 1000);//wait 2 secon

    }



    useEffect(() => {
        user2.get('alias').on(v => setUsername(v));
    }, [])

    return (
        <>

            {replie ? (
                <>
                    <Reply back={replySwitch} keys={key} chToken={props.chatToken + 'S'} />
                </>
            ) : (
                    <>
                        <div >

                            <input
                                onChange={onChange}
                                placeholder="Titel"
                                name="titel"
                                value={form.titel}
                            />
                            <br />
                            <textarea
                                onChange={onChange}
                                placeholder="Message"
                                name="message"
                                value={form.message}
                            />
                            <button onClick={saveMessage}>Send Message</button>
                            {
                                state.messages.map(message => (
                                    <div key={message.createdAt}>
                                        <h1>{message.titel}</h1>
                                        <h2>{message.message}</h2>
                                        <button onClick={() => props.profils(message.name)}>From: {message.name}</button>
                                        <p>Date: {message.createdAt}</p>
                                        <br />
                                        <button onClick={() => replySwitch(message.key)}>Antworten</button>
                                        <button onClick={() => switchReplies(message.key)}>Antworten Anzeigen</button>
                                        <button onClick={() => setLike(message.key)}>{message.likeAnz} Interessiert mich</button>

                                        {showReplie === message.key && showReplies ? (
                                            <>
                                                <p>Antworten</p>
                                                {Rstate.Rmessages.map(message => (
                                                    <div key={message.createdAt}>
                                                        <h3>{message.message}</h3>
                                                        <button onClick={() => props.profils(message.name)}>From: {message.name}</button>

                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                                <>
                                                </>
                                            )}
                                    </div>


                                ))
                            }
                        </div >
                    </>
                )}





        </>
    );

}