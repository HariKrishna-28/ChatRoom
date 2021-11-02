import React from 'react'
import Logo from "../assets/GitHub-Mark.png"


const ProfileLink = () => {
    return (
        <>
            <a href="https://github.com/HariKrishna-28/ChatRoom" target="_blank" rel="noreferrer">
                <img src={Logo} alt="github" width="50px" style={{ borderRadius: "50%" }} />
            </a>
        </>
    )
}

export default ProfileLink
