import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {            
            try {
                const response = await axios.get("http://localhost:8080/users", {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem("authorization")}`
                    }
                });
                // console.log(JSON.stringify(response.data));

                setUsers(response.data);
                setError(null);
            } catch (error) {
                setError(error);
                if (error.response) {
                    // give an error response
                    if (error.response.status === 401) {
                        console.log("401 Unauthorized : request not completed because it lacks valid authentication credentials for the requested resource");            
                    } else {
                        console.log("an error response : "+error.response.data + " Status: "+ error.response.status + " Headers: " + error.response.headers);
                    }
                } else if (error.request) {
                    // never received a response - request never left
                    console.log("request error: "+error.request);
                } else {
                    // other
                    console.log("other error: "+error);
                }
            }
        }
        fetchData();
    }, [])
    

    return (
    <div>
        <ul>
            {
                error ? navigate("/") : <h1>Users</h1>  
            }
        </ul>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>User Name</th>
                    <th>Real Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{ index + 1 }</td>
                        <td>{ user.user_name}</td>
                        <td>{ user.real_name}</td>
                        <td>{ user.email }</td>
                    </tr>
                ))}                
            </tbody>
        </table>  
    </div>
  )
}

export default Users