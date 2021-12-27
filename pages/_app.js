import Landingpage from './landingpage';
import Headerr from './header';
import Login from './login';
import Register from './register';
import Profil from './profil';
import CreateTopic from './createTopic';
import '../styles/globals.css'
import { useEffect, useState, useReducer } from 'react'
import 'gun/sea';
import 'gun/axe';
import Gun from 'gun'

// initialize gun locally
// sync with as many peers as you would like by passing in an array of network uris
export const gun = Gun({
  peers: [
    'https://relay.peer.ooo/gun'
  ]
})

export const user2 = gun.user().recall({ sessionStorage: true });

export default function MyApp() {


  // Use State um zum Profil und zurück zu Switchen
  const [profiler, setProfiler] = useState(false);

  // Use State um zu Topic Erstellen zu Switchen
  const [topic, setTopic] = useState(false);

  // Use State um zwischen Login und Registrierungs Page zu Switchen
  const [registerer, setRegisterer] = useState(false);

  // Use State um den Aktuell eingeloggten Username abzufangen
  const [username, setUsername] = useState("");

  // Funktion um Use State Variable zu ändern, damit die Profil Seite, oder die Vorherige Seite gezeigt wird
  function profilSwitch() {

    if (profiler == false) {
      setTopic(false);
      setProfiler(true);
    } else {
      setProfiler(false);

    }

  }

  // Funktion um Use State Variable zu ändern, damit die Login Seite, oder die Registrations Seite gezeigt wird
  function switcher() {
    if (registerer == false) {
      setRegisterer(true);
    } else {
      setRegisterer(false);
    }

  }

  // Funktion um Use State Variable zu ändern, damit die Themen Erstell Seite, oder die Vorherige Seite gezeigt wird
  function topicSwitch() {
    setProfiler(false);
    if (topic == true) {
      setTopic(false);
    } else {
      setTopic(true);
    }

  }
  // Use Effect um den aktuellen Username zu erhalten
  useEffect(() => {

    user2.get('alias').on(v => setUsername(v));

  }, [])

  return (
    <>
      <div >
        {/* Überprüfen ob User eingeloggt ist */}
        {username ? (
          <>
            {/* Überprüfen ob der Profil Button gedrückt wurde */}
            {profiler ? (
              <>
                <Headerr user2={user2} loggedIn={1} switchs={profilSwitch} topic={topicSwitch} titelProfil={'Zürück'} titel={'Thema Erstellen'} />

                <Profil username={username} />
              </>
            ) : (
                <>
                  {/* Überprüfen ob der Themen Erstell Button gedrückt wurde */}
                  {topic ? (
                    <>
                      <Headerr user2={user2} loggedIn={1} switchs={profilSwitch} topic={topicSwitch} titel={'Zürück'} titelProfil={'Profil anschauen'} />

                      <CreateTopic />

                    </>
                  ) : (
                      <>
                        {/* Ausgabe der Landinpage sofern der User eingeloggt ist */}
                        <Headerr user2={user2} loggedIn={1} switchs={profilSwitch} topic={topicSwitch} titel={'Thema Erstellen'} titelProfil={'Profil anschauen'} />

                        <Landingpage />

                      </>
                    )}


                </>
              )}

          </>
        ) : (
            // Ausgabe wenn der User nicht eingeloggt ist
            <>
              {/* Überprüfen ob der Registrier Button gedrückt wurde */}
              {registerer ? (
                <>
                  <Headerr loggedIn={0} />
                  <Register switche={switcher} />

                </>
              ) :
                (<>
                  {/* Login Ausgabe falls der Registrier Button nicht gedrückt wurde, oder man zurück geklickt hat */}
                  <Headerr loggedIn={0} />
                  <Login switche={switcher} />

                </>
                )}


            </>
          )}
      </div>
    </>
  )
}
