import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Logo from "../assets/Logo2.jpg"

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div>
                <div className="flex align-center justify-center mb-2">
                    <img
                        src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="60px" alt="hand-wave" />

                </div>
                <h1 className="font-semibold text-3xl text-center mb-2 p-4 ">Welcome to ChatRoom!</h1>
                {/* <h2 className="font-semibold text-xl text-center mb-2 p-4 ">A chat application built using SocketIo, ReactJs, ExpressJs and Auth0</h2> */}
                {/* <h2 className="font-semibold text-2xl text-center">Login to continue</h2> */}
                <div className="flex align-center justify-center ">

                    <button
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded align-center"
                        style={{ width: "250px", outline: "none", border: "0" }}
                        onClick={() => loginWithRedirect()}>

                        <span className="flex align-center items-center justify-center gap-2">
                            <img src={Logo} alt="google" width="30px" style={{ borderRadius: "50%", }} />
                            Log In With Google
                        </span>

                    </button>
                </div>
            </div>
        )
    )
}

export default LoginButton