import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import ExpertSignUp from './expertSignUp';
import 'gun/sea';
import 'gun/axe';

import StripeContainer from './stripeContainer';
import { gun, user2 } from './_app'


export default function Profil(username) {


    // Use State Variabel die die Daten des Aktuellen Users speichert
    const [profil, setProfil] = useState({
        nachname: '', vorname: '', geburtstag: '', wohnort: '', plz: '', strasse: '', strassennummer: '', land: '', name: '', expert: '', telnummer: '', email: '', profilpic: ''
    })

    const [expertSite, setExpertSite] = useState(false);
    const [subSite, setSubSite] = useState(false);
    // Use Effect Hook die die Daten des Users aus Gun übernimmt
    useEffect(() => {

        console.log("username: ", username.username);

        gun.get('user3').map().once(function (m) {
            // Mapt die user und schaut wo der username mit dem aktuellen übereinstimmt
            if (m.name == username.username) {
                console.log(m.nachname, m.vorname, m.geburtstag, m.wohnort, m.plz, m.strasse, m.strassennummer, m.land, m.name, m.expert, m.telnummer, m.email, m.expert);
                // Lädt die Daten in die UseState Funktion
                setProfil({
                    nachname: m.nachname,
                    vorname: m.vorname,
                    geburtstag: m.geburtstag,
                    wohnort: m.wohnort,
                    plz: m.plz,
                    strasse: m.strasse,
                    strassennummer: m.strassennummer,
                    land: m.land,
                    name: m.name,
                    expert: m.expert,
                    telnummer: m.telnummer,
                    email: m.email,
                    profilpic: m.profilpic
                })
            }
        })
    }, [])

    function getExpert() {

        setExpertSite(true);
    }

    function getSub() {

        setSubSite(true);
    }



    return (

        <div >
            {expertSite ? (
                <>

                    <ExpertSignUp username={username.username} />
                </>
            ) : (
                    <>
                        {subSite ? (
                            <>
                                <StripeContainer />
                            </>
                        ) : (
                                <>
                                    {username.chat ? (
                                        <>
                                            <button onClick={username.back}>Zurück</button>
                                        </>
                                    ) : (<></>)}

                                    <p>{profil.vorname} {profil.nachname}</p>
                                    <p>Username: {username.username}</p>
                                    <p>Geburtstag: {profil.geburtstag}</p>
                                    <p>Land: {profil.land}</p>
                                    <p>Telefonnummer: {profil.telnummer}</p>
                                    <p>Email: {profil.email}</p>
                                    {profil.expert ? (
                                        <p>Experte</p>
                                    ) : (
                                            <p>User</p>
                                        )}

                                    <button onClick={getExpert}>Experte Werden</button>
                                    <button onClick={getSub}>Subscription</button>
                                </>
                            )}

                    </>
                )
            }

        </div >
    );

}