import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.photoURL, "email");
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const signin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input placeholder="Email..." onChange={handleEmail} />
      <input
        placeholder="Password..."
        type="password"
        onChange={handlePassword}
      />
      <button onClick={signin}>Sign In</button>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Auth;
