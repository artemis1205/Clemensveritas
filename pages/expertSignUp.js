import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import 'gun/sea';
import 'gun/axe';
import emailjs from 'emailjs-com'



export default function ExpertSignUp(props) {


    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_oglynm6', 'template_lsr7fyp', e.target, 'user_CLIcSr9RpftpkJfaNN98F')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }
    return (
        <>
            <h1>Become an Expert</h1>
            <div>
                <form onSubmit={sendEmail}>
                    <input value={props.username} name="username" />
                    <input type="text" name="name" />
                    <textarea name="message" />
                    <input type="submit" />
                </form>
            </div>


        </>
    )
}