import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { signInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase";

function CompleteRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory;

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //Validation
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      console.log(result);
    } catch (error) {
      console.log("Registration error", error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="container-p-5">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter Password"
            disabled={loading}
          />
        </div>
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CompleteRegistration;
