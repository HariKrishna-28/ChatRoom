// import { text } from 'express'
import React, { useEffect, useState } from 'react'
// import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({ socket, name, room }) => {
    const [currMsg, setCurMsg] = useState("")
    const [messageList, setMessageList] = useState([])

    const SendMessage = async () => {
        if (currMsg !== "") {
            const messageData = {
                room: room,
                author: name,
                message: currMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurMsg("")

        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setMessageList((list) => [...list, data])

        })
    }, [socket])

    return (

        <div className="flex flex-col items-center justify-center">
            {/* <div>hi</div> */}
            <div className="container">

                <div className="grid grid-cols-1 container bg-gray-800 text-white rounded p-2 gap-2 ">

                    <div >
                        <h1 className="font-semibold text-3xl ">Chat Point</h1>
                        {/* <div className="flex gap-2"> */}
                        {/* <p className="text-sm font-semibold"> User Name : <span className="text-gray-300">{name}</span></p> */}
                        <p className="text-sm font-semibold">Room ID: <span className="text-gray-300">{room}</span></p>
                        {/* </div> */}
                    </div>
                </div>
                <div className="flex-grow-1" style={{ width: "380px" }}>
                    <div className="flex-grow-1 overflow-y-scroll overflow-x-hidden border-2 border-grey-500 rounded p-2" style={{ height: "300px" }}>
                        {/* <ScrollToBottom style={{ width: "100%", height: "100%", overflowY: "auto" }}> */}
                        {messageList.map((messageBody) => {

                            const textAlign = name !== messageBody.author ? "text-left" : "text-right"
                            const bg = name !== messageBody.author ? " bg-blue-500 text-white rounded text-sm p-1 px-2" :
                                " bg-green-500 text-sm text-white text-left rounded p-1 px-2"

                            return (
                                <div className={textAlign}>
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
                        SendMessage()
                    }}>

                        <input
                            type="text"
                            className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => { setCurMsg(e.target.value) }}
                            value={currMsg}
                            required
                            autoFocus />

                        <div className=" flex justify-center items-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                type="submit">Send Message</button>
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