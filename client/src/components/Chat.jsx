import React, { useEffect, useState } from 'react'
import IncomingMessageAudio from "../assets/juntos-607.mp3"
import '../styles/ChatStyle.css'
import OutGoingMessageAudio from "../assets/when-604.mp3"
import LogoutButton from './LogoutButton'
import SendButton from '../assets/send.svg'

const Chat = ({ socket, name, room }) => {
    const [currMsg, setCurMsg] = useState("")
    const [messageList, setMessageList] = useState([])
    const incoming = new Audio(IncomingMessageAudio);
    const outgoing = new Audio(OutGoingMessageAudio)

    function MessageScroll() { //scrolls to the bottom of the div tag
        const div = document.getElementById("message-box")
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }

    // const ButtonWidth = {
    //     width: "200px",
    //     outline: "none",
    //     border: "0"
    // }

    const SendMessage = async () => {
        if (currMsg !== "") {
            const messageData = {
                room: room,
                author: name,
                message: currMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            outgoing.play()
            setMessageList((list) => [...list, messageData])
            setCurMsg("")
            // MessageScroll()

        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log(data)
            setMessageList((list) => [...list, data])
            incoming.play()
            // MessageScroll()

        })
        // eslint-disable-next-line
    }, [socket])

    useEffect(() => {
        MessageScroll()
    }, [messageList])

    return (

        <div >
            {/* <div>hi</div> */}
            <div className="container">
                <div className="grid grid-cols-1 bg-gray-800 text-white rounded p-2 gap-2 " style={{ backgroundColor: "rgb(38, 39, 48)" }}>

                    <div >
                        <div className="flex" >
                            <h1 className="font-semibold text-3xl ">
                                <a href="https://github.com/HariKrishna-28/ChatRoom"
                                    target=" _blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-500" >
                                    ChatRoom
                                </a>
                            </h1>

                        </div>

                        <p className="text-sm font-semibold">Room ID: <span className="text-gray-300">{room}</span></p>


                    </div>
                </div>
                <div className="flex-grow-1" id="outer-box" >
                    <div className="flex-grow-1 overflow-y-scroll overflow-x-hidden border-2 border-gray-800 rounded p-2"
                        id="message-box"
                    >

                        {messageList.map((messageBody, key) => {
                            const textAlign = name !== messageBody.author ? "text-left" : "text-right"
                            const bg = name !== messageBody.author ? " bg-blue-500 text-white rounded text-sm p-1 px-2" :
                                " bg-green-500 text-sm text-white text-left rounded p-1 px-2"

                            return (
                                <div className={textAlign} key={key}>
                                    {/* <h1>{messageBody.message}</h1> */}
                                    {/* <div> */}

                                    <div >
                                        <span className={bg}>{messageBody.message}</span>
                                    </div>
                                    <div className="gap-3 py-1 text-gray-700" style={{ fontSize: "12px" }}>
                                        <p className="font-semibold">{name === messageBody.author ? "You" : messageBody.author} &ensp; {new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() === messageBody.time ? "Now" : messageBody.time}</p>
                                        {/* <p>{new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() === messageBody.time ? "Now" : messageBody.time}</p> */}
                                    </div>

                                    {/* </div> */}

                                </div>
                            )
                        })}

                        {/* </ScrollToBottom> */}

                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (currMsg) {
                            SendMessage()
                        }
                    }}>
                        <div className="flex gap-1 mt-1">
                            <input
                                type="text"
                                style={{ color: "white", backgroundColor: "rgb(38, 39, 48)" }}
                                className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => { setCurMsg(e.target.value) }}
                                value={currMsg}
                                // style={{ backgroundColor: "rgb(38, 39, 48)" }}
                                autoFocus />

                            <button className="bg-purple-500 hover:bg-purple-700 p-3 text-white font-semibold rounded"
                                type="submit">
                                <img src={SendButton} alt="send" />
                            </button>
                        </div>

                        <div className=" flex flex-row mt-2 justify-center items-center">
                            {/* <button
                                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                                type="submit"
                                style={ButtonWidth}
                            >Send Message</button> */}

                            <LogoutButton />
                        </div>

                    </form>

                </div >


                {/* <header>Live chat</header>
            <div></div>
            <div>
                <input type="text"
                    placeholder="your message"
                    onChange={(e) => { setCurMsg(e.target.value) }}
                    required
                    autoFocus
                />
                <button onClick={SendMessage}>&#9658;</button>
            </div> */}
            </div>

        </div >
    )
}

export default Chat