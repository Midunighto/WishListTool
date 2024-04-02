import SignIn from "../components/SignIn";

import "../styles/auth.scss";

export default function AuthSignIn() {
  return (
    <div className="wrapper">
      <h1>Se connecter</h1>
      <SignIn />
    </div>
  );
}
