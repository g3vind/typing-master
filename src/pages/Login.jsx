import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();
  // function to sign in with google
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      // result contains info about logged in user
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/app");
      })
      .catch((error) => {
        console.log("Caught error Popup closed", error);
      });
  }

  return (
    <div className="login-main">
      <div>
        <h1 className="title title-login">
          TYPING
          <span className="master">MASTER</span>
        </h1>
      </div>
      <div className="loginPage">
        <p>Sign In With Google to Continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
