import { useContext } from "react";
import "./App.css";
import { UserContext } from "./context/UserContext";
import { Header } from "./components/Header";
import { LoginUser } from "./components/LoginUser";
import { MyRoutes } from "./router/MyRouter";

function App() {

  const { username } = useContext(UserContext);

  if (!username) {
    return <LoginUser />;
  }

  return (
    <>
    <Header />
    <div className="app-container">
      <div className="main-content">
        <MyRoutes />
      </div>
    </div>
    </>
  );
}

export default App;
