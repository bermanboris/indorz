import React, { useContext } from "react";
import { Button } from "reactstrap";
import { AuthContext } from "./auth";

function App() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>You are logged in!</h1>
      <hr />
      <Button color="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default App;
