import React, { useState } from 'react'
import axios from 'axios';
// ref: https://stackoverflow.com/questions/63471931/using-history-with-react-router-dom-v6
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const Auth = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post("http://localhost:8080/jwtlogin", {
                user_name: username,
                user_password: password
            });
            localStorage.setItem("authorization", resp.headers.authorization);
            // console.log(resp.headers.authorization);
            navigate("/users");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg);                
            }
        }
    }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
    <div className="hero-body">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-4-desktop">
                    <form onSubmit={Auth} className="box">
                        <p className="has-text-centered">{message}</p>
                        <div className="field mt-5">
                            <label className="label">Username</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Password</label>
                            <div className="controls">
                                <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button className="button is-success is-fullwidth">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Login