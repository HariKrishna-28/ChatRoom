import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
// import Logo from "./assets/GitHub-Mark.png"
import { useAuth0 } from '@auth0/auth0-react';
import ProfileLink from "./components/ProfileLink"
import ScaleLoader from "react-spinners/ScaleLoader"


function App() {
  const { isAuthenticated } = useAuth0()
  const { isLoading } = useAuth0();

  if (isLoading) return <div className="flex flex-col items-center justify-center h-screen">
    <ScaleLoader

      color="rgb(38, 39, 48)"
    />
  </div>

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginButton />
      {/* <LogoutButton /> */}
      <Profile />
      {
        !isAuthenticated &&
        <div className="mt-10">
          <ProfileLink />
        </div>
      }
    </div>
  );
}

export default App;
