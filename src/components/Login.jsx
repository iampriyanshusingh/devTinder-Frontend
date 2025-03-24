import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("elonmusk@gmail.com");
  const [password, setPassword] = useState("Elon@123");

  const handleLogin = async () => {
    // API call to login
    try {
      await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10 left-0 right-0">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter Your Email ID"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
