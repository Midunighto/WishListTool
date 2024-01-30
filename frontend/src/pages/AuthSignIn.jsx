import { useState } from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import "../styles/auth.scss";

export default function AuthSignIn() {
  const [signedUp, setSignedUp] = useState(true);

  return (
    <div className="wrapper">
      {!signedUp ? (
        <SignUp setSignedUp={setSignedUp} signedUp={signedUp} />
      ) : (
        <SignIn setSignedUp={setSignedUp} signedUp={signedUp} />
      )}
    </div>
  );
}
