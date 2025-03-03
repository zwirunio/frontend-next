"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context-provider";

function ProfilePage() {
  const authContext = useContext(AuthContext);
  return (
    <>
      <h1>Profile</h1>
      <p>Profile page content</p>


      {authContext?.auth ? authContext.auth.email : " NOK"}
    </>
  );
}

export default ProfilePage;