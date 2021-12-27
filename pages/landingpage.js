
import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';

import CreateTopic from './createTopic'
import Topic from './topic'
import { gun, user2 } from './_app'


// Globaler Array welcher die Themen aus Gun speichert, um sie visuell auszugeben
const initialState = {
    topics: []
}

// Reducer Effect welcher den Array Updatet
function reducer(state, topic) {
    return {
        topics: [topic, ...state.topics]
    }
}


export default function Landingpage() {
    // Use State welche zwischen einem Thema und der Landingpage wechselt
    const [switchTopic, setSwitchTopic] = useState(false);

    // Gibt den Token eines Topics an die Topic Seite weiter
    const [token, setToken] = useState('');
    const [username, setUsername] = useState("");

    // Nimmt die Themen und seine Attribute aus der Use Effect Hook und gibt sie weiter an die globale reducer Funktion
    const [state, dispatch] = useReducer(reducer, initialState);


    // Nimmt die Themen und seine Attribute aus Gun
    useEffect(() => {
        const topics = gun.get('topic7')

        // Jedes Thema wird gemappt
        topics.map().once(function (m) {
            if (m.titel != null) {
                dispatch({
                    titel: m.titel,
                    views: m.views,
                    erstellDatum: m.erstellDatum,
                    topicId: m.topicId
                })
            }


        });
    }, [])

    // Ändert die Use State Variabel um zwischen Thema und Landing Page zu switchen. Gelichzeitig gibt es noch den Token des Themas weiter
    function changeToken(prop) {
        if (switchTopic == true) {
            setToken('')
            setSwitchTopic(false);
        } else {
            setToken(prop);
            setSwitchTopic(true);
        }
        const topics = gun.get('topic7')

        // Funktion um die View Anzahl um eines zu erhöhen Falls jemand darauf klickt
        topics.map().once(function (m) {
            if (m.topicId === prop) {
                const key = m._['#'];
                const view = m.views;
                topics.get(`${key}`).put({ views: view + 1 })
            }
        })


    }


    return (
        <>
            {/* Überprüft ob die Use State Variabel Topic True ist oder nicht */}
            {switchTopic ? (
                <>

                    <Topic back={changeToken} tokenId={token} />
                </>
            ) : (
                    <>
                        <div class="topics">
                            {
                                state.topics.map(topic => (
                                    <div class="topic">
                                        <h2>{topic.titel}</h2>
                                        <h3> {topic.views} Aufrufe</h3>
                                        <p>Erstellt am: {topic.erstellDatum}</p>
                                        {/* Aktiviert die Funktion um auf das angeklickte Thema zu kommen  */}
                                        <button onClick={() => changeToken(topic.topicId)} >View Topic</button>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}



        </>
    )

}