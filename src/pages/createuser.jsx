/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    Phone: "",
    roleId: ""
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("https://localhost:7217/roles");
        const data = await response.json();
        if (data.isSuccess) {
          setRoles(data.result);
        } else {
          throw new Error(data.message || "Failed to load roles");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7217/api/Admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.isSuccess) {
        alert("User created successfully");
         navigate("/users");
       
      } else {
        alert(result.message || "Failed to create user");
      }
    } catch (error) {
      alert("Error creating user: " + error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Create User</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="Phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>Select Role</option>
          {roles.map((role) => (
            <option key={role.roleId} value={role.roleId}>
              {role.roleName}
            </option>
          ))}
        </select>
        <button
  type="submit"
  className="bg-green-500 text-white px-4 py-2 rounded mr-4"
>
  Create User
</button>

<button
  type="button" 
  className="bg-green-500 text-white px-4 py-2 rounded"
  onClick={() => navigate("/users")}
>
  Go Back 
</button>
      </form>
    </div>
  );
};

export default CreateUserPage;