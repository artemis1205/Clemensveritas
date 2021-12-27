import { useEffect, useState, useReducer, Profiler } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';

import Topic from './topic';
import UserChat from './userChat';
import Profile from './profil';
import ExpertChat from './expertChat';

import { gun, user2 } from './_app'

export default function Landingpage(props) {

    // Use State speichert über ein spezifisches Thema die Daten
    const [topicContent, setTopicContent] = useState({
        titel: '', beschreibung: '', topicId: '', ersteller: '', userChat: '', expertenChat: ''
    })

    const [username, setUsername] = useState("");

    // Schaut ob jemand auf den 
    const [profil, setProfil] = useState(false);
    const [profilName, setProfilName] = useState('');

    const [chat, setChat] = useState(false);

    useEffect(() => {
        const topics = gun.get('topic7')

        topics.map().once(function (m) {
            if (m.topicId == props.tokenId) {

                setTopicContent({
                    titel: m.titel,
                    beschreibung: m.beschreibung,
                    topicId: m.topicId,
                    ersteller: m.ersteller,
                    userChat: m.userChat,
                    expertenChat: m.expertChat

                })
            }
        });


    }, [])

    function userChat() {
        setChat(false);
    }

    function expertChat() {
        setChat(true);
    }

    useEffect(() => {
        user2.get('alias').on(v => setUsername(v));
    }, [])


    console.log()
    return (
        <>
            <div className="discussion">
                <button onClick={props.back}>Zurück</button>

                <h1>{topicContent.titel}</h1>

                <p>Beschreibung: {topicContent.beschreibung}</p>
                <p>Ersteller: {topicContent.ersteller}</p>

                <button onClick={expertChat}>Experten Chat</button>
                <button onClick={userChat}>User Chat</button>
                {chat ? (
                    <ExpertChat chatToken={props.tokenId} usern={username} />
                ) : (
                        <UserChat profils={prop => profiler(prop)} chatToken={props.tokenId} />
                    )}
            </div>
        </>
    )
}
