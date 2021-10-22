import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div>
                <div className="flex align-center justify-center mb-2">
                    <img
                        src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="60px" />

                </div>
                <h1 className="font-semibold text-3xl text-center mb-2 border-2 p-4 rounded">Welcome to ChatRoom!</h1>
                {/* <h2 className="font-semibold text-2xl text-center">Login to continue</h2> */}
                <div className="flex align-center justify-center ">

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-center"
                        style={{ width: "200px" }}
                        onClick={() => loginWithRedirect()}>
                        Log In
                    </button>
                </div>
            </div>
        )
    )
}

export default LoginButton