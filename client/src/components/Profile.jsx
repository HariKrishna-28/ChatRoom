import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ChatBody from './ChatBody';
import LogoutButton from "./LogoutButton"

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div className="flex flex-col items-center justify-center h-screen ">
                <ChatBody />
                {/* <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                {JSON.stringify(user, null, 2)} */}
            </div>
        )
    )
}

export default Profile