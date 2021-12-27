import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';
import { gun, user2 } from './_app'



export default function CreateTopic() {
    // Use State Variabel welche den Username catcht
    const [username, setUsername] = useState("");

    //  Use State Variabel die die Daten des Themas einfängt, um es später in gun zu laden
    const [topicDetails, setTopicDetails] = useState({
        titel: '', beschreibung: '', ersteller: '', erstellDatum: '', film1: '', film2: '', expertChat: '', userChat: '', views: 0, topicPic: '', categorie: '', topicId: ''

    })
    // Use Effect catcht den Username und leitet in an die Use State variabel weiter
    useEffect(() => {
        user2.get('alias').on(v => setUsername(v));
    }, [])



    // Funktion die ausgeführt wird wenn der Erstell Button geklickt wurde
    function createTopic() {
        // Variabeln um das Datum schön speeichern zu können
        let newDate = new Date()
        let separator = " ";
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        // const die die Haupt Entität bestimmt (Topic7 weil die anderen beim testen kaputt gingen (kann in der richtigen Version wieder geändert werden))
        const topics = gun.get('topic7');
        // Überprüft ob in allen Feldern eine eingabe steht
        if (topicDetails.titel != '' && topicDetails.beschreibung != '' && topicDetails.categorie != '') {
            //Erstellt einen Random Token
            const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            // Fügt die Daten in topic7 ein (Viele Felder bleiben leer, da sie erst später beschrieben werden)
            topics.set({
                titel: topicDetails.titel,
                beschreibung: topicDetails.beschreibung,
                ersteller: username,
                erstellDatum: `${date}.${month < 10 ? `0${month}` : `${month}`}.${year}`,
                film1: '',
                film2: '',
                expertChat: randomToken + 'E',
                userChat: randomToken + 'U',
                views: 0,
                topicPic: '',
                categorie: topicDetails.categorie,
                topicId: randomToken

            })
            // Setzt die eingabe Felder danach wieder auf leer
            setTopicDetails({ titel: '', beschreibung: '', ersteller: '', erstellDatum: '', film1: '', film2: '', expertChat: '', userChat: '', views: 0, topicPic: '', categorie: '', topicId: '' })
        } else {
            alert("setError noch einbauen!");
        }





    }
    // Nimmt während der Eingabe die Werte schon in die Topic Detail Use State Variabel auf
    function onTopics(e) {
        setTopicDetails({ ...topicDetails, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* Titel für ein Thema */}
            <label>Titel</label>
            <input
                onChange={onTopics}
                placeholder="Titel"
                name="titel"
                value={topicDetails.titel}
            />
            {/* Beschreibung für ein Thema */}
            <label>Beschreibung</label>
            <textarea
                onChange={onTopics}
                placeholder="Beschreibung"
                name="beschreibung"
                value={topicDetails.beschreibung}
            > </textarea >
            <label>Categorie</label>
            {/* Auswählen welcher Kategorie es zugehörig ist */}
            <select name="categorie" onChange={onTopics}>
                <option value=''>Kategorie Wählen</option>
                <option value='Wirtschaft'>Wirtschaft</option>
                <option value='Politik'>Politik</option>
                <option value='Wissenschaft'>Wissenschaft</option>
                <option value='Gesundheit'>Gesundheit</option>
            </select>
            {/* Button der die createTopic Funktion ausführt */}
            <button onClick={createTopic}>Create Topic</button>
        </>
    )
}
