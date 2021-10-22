import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <LoginButton />
      {/* <LogoutButton /> */}
      <Profile />
    </div>
  );
}

export default App;
