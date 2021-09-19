// import './App.css';
import { useState } from "react";
import io from "socket.io-client"
import Chat from "./components/Chat";

const baseUrl = "https://chat-room-28.herokuapp.com"
// const baseUrl = "http://localhost:5000"

const socket = io.connect(baseUrl)

function App() {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const JoinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      {!showChat ? (

        <div className="grid grid-cols-1 gap-2">
          {/* <h1>Hi frans</h1>  */}
          <h3 className="font-semibold text-3xl text-center">Join a Chat</h3>
          <form>
            <input
              type="text"
              placeholder="name"
              className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="room"
              required
              onChange={(e) => setRoom(e.target.value)}
            />
            <div className="flex align-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded "
                onClick={JoinRoom}>
                Join room
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex">
          <Chat
            socket={socket}
            name={name}
            room={room} />

        </div>
      )}
    </div>);
}

export default App;
