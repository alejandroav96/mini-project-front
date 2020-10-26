import React, { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { firebase } from "../firebase";

export const Auth = React.createContext<boolean>(false);

export const AuthContext = ({ children }: any) => {
    const [user, setUser] = useState<boolean>(false);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        isLogin();
    });

    const isLogin = () => {
        firebase.auth.onAuthStateChanged((user: any) => {
            user ? setUser(true) : setUser(false);
            setShowChild(true);
        });
    }

    if (!showChild) {
        return <Loading />;
    } else {
        return (
            <Auth.Provider
                value={user}
            >
                {children}
            </Auth.Provider>
        );
    }
};