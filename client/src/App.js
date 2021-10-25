import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
// import Logo from "./assets/GitHub-Mark.png"
import { useAuth0 } from '@auth0/auth0-react';
import ProfileLink from "./components/ProfileLink";



function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
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
