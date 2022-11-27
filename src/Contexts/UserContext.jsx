/* eslint-disable react/jsx-no-constructed-context-values */
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { useEffect, useState } from 'react';

import auth from '../configs/firebase.config';

import AuthContext from './AuthContext';

const UserContext = ({ children }) => {
    // hooks
 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // create user functionality
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // signIn functionality
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // logout functionality
    const logOut = () => {
        localStorage.removeItem('ace-legal-token');
        setLoading(true);
        return signOut(auth);
    };

    // reset pass functionality
    const sendPassResetEmail = (email) => sendPasswordResetEmail(auth, email);

    // update profile functionality
    const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);

    // useEffect observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (
                firebaseUser === null ||
                firebaseUser?.uid ||
                (firebaseUser?.providerData[0]?.providerId === 'github.com' && firebaseUser?.uid)
            ) {
                setUser(firebaseUser);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // google authentication
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                createUser,
                signIn,
                logOut,
                setLoading,
                sendPassResetEmail,
                updateUserProfile,
                googleSignIn,

                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;
