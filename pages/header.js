import React, { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';

import { render } from 'react-dom';

import { gun, user2 } from './_app'


export default function Header(props) {




    // Funktion die den User wieder ausloggt
    function signOut() {
        user2.leave();
        window.location.reload(false);

    }

    // Prop Variabel die den Wert, ob User eingeloggt ist oder nicht übernimmt aus der Parent Component _app.js
    const log = props.loggedIn;



    if (log === 1) {
        // Return wenn der User eingeloggt ist 
        return (

            <>

                <div className="header">
                    <h1>Veritas</h1>
                    {props.username2 === 'Clemens' || props.username2 === 'Andrej' ? (
                        <>
                            <button onClick={props.create}>Admin Create</button>
                        </>
                    ) : (<>
                    </>)}
                    <button onClick={signOut}>Sign Out</button>
                    {/* Props die sich anpassen jenachdem auf welcher Seite man ist */}
                    <button onClick={props.switchs}>{props.titelProfil}</button>
                    <button onClick={props.topic}>{props.titel}</button>

                </div>
                <div className="spacer"></div>
            </>
        )

    } else {
        // Return falls der User nicht eingeloggt ist
        return (
            <>
                <div className="header">
                    <h1>Ausgeloggt</h1>
                </div>
                <div className="outspacer"></div>
            </>
        )
    }



} 