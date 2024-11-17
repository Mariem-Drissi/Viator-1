import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching users!", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add a new user (POST request)
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("All fields are required");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users`, newUser)
      .then((response) => {
        setUsers([...users, response.data]); // Add the new user to the list
        setNewUser({ name: "", email: "", password: "" }); // Clear the form
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  // Delete a user (DELETE request)
  const handleDeleteUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id)); // Remove the deleted user from the list
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <div>
      <h2>Users</h2>

      {/* Add User Form */}
      <input
        type="text"
        name="name"
        value={newUser.name}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <input
        type="email"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <input
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      <button onClick={handleAddUser}>Add User</button>

      {/* Users List */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
