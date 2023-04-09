import React, { useEffect } from "react";
import { auth } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect (() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            }
            else {
                setAuthUser(null)
            }

        })}, [])

        return (
            <div>
                {authUser ? <p>Logged in as {authUser.email}</p> : <p>Not logged in</p>}
            </div>
        )
    }

export default AuthDetails