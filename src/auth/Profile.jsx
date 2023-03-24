import React from "react";
import { UserContext } from "../UserContext/UserContext";

const Profile = () => {
  const user = React.useContext(UserContext);

  return (
    <>
      <span style={{ color: "green" }}>Welcome {user.name}! </span>
      {console.log(user)}
    </>
  );
};

export default Profile;
