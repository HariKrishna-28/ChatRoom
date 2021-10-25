import React from 'react'
import { useState } from "react";
import io from "socket.io-client"
import Chat from "./Chat";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './LogoutButton';
import ProfileLink from './ProfileLink';


const baseUrl = "https://chat-room-28.herokuapp.com"
// const baseUrl = "http://localhost:5000"

const socket = io.connect(baseUrl)

const ChatBody = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    // eslint-disable-next-line
    const { user, isAuthenticated } = useAuth0();
    const [showChat, setShowChat] = useState(false)

    const JoinRoom = () => {
        if (name !== "" && room !== "") {
            socket.emit("join_room", room)
            setShowChat(true)
        }
    }

    return (
        <div >
            {!showChat ?
                (
                    <div className="grid grid-cols-1 gap-2">
                        {/* <h1>Hi frans</h1> */}
                        {/* <h3 className="font-bold text-3xl text-center">Welcome!</h3> */}
                        {/* <h3 className="font-bold text-3xl text-center">Join a Chat</h3> */}
                        <div className="flex align-center justify-center">
                            <img src={user.picture} alt={user.name} width="100px" style={{ borderRadius: "50%" }} />
                        </div>
                        <p className="font-semibold text-3xl text-center">Hi, {user.name}</p>
                        <form className="mx-10 lg:mx-0">

                            <input
                                type="text"
                                placeholder="UserName"
                                className="shadow appearance-none border border-blue-500 rounded w-full py-2 mx-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="text"
                                className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 mx-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Room ID"
                                required
                                onChange={(e) => setRoom(e.target.value)}
                            />

                            <div className="flex align-center justify-center">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded "
                                    onClick={JoinRoom}
                                    style={{ "width": "200px" }}
                                >
                                    Join/Create room
                                </button>
                                {/* <LogoutButton />
                                <div className="flex align-center justify-center mt-5">
                                    <ProfileLink />
                                </div> */}
                            </div>

                        </form>
                        <div className="grid grid-row-2 gap-3 align-center justify-center">
                            <LogoutButton />
                            <div className="flex align-center justify-center mt-5">
                                <ProfileLink />
                            </div>

                        </div>
                    </div>
                ) : (

                    <div>

                        <Chat
                            socket={socket}
                            name={name}
                            room={room} />


                    </div>
                )}
        </div>);
}

export default ChatBody;
