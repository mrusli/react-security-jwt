import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Users = () => {

    const [users, setUsers] = useState([]);

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
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    

    return (
    <div>
        <h1>Users</h1>
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