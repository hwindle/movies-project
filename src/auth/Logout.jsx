import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const Logout = () => {
  const { logout } = useAuth0();
  // authenticated - show log out btn
  return (
    <Button
      style={{ background: "transparent", border: "black" }}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};

export default Logout;
