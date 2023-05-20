import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase.jsx';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error)
        }
    };
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error)
        }
    };
    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className='loginForm'>
            <input type='email' placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign in</button>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}