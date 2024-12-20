import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PondManagement.css";
const PondManagement = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchPonds = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/ponds");
      setPonds(response.data);
    } catch (error) {
      console.error("Error fetching ponds:", error);
    }
    setLoading(false);
  };

  // Approve a user
  const approvePond = async (pond_id) => {
    try {
      await axios.put(`http://localhost:8000/api/ponds/${pond_id}/approve`);
      fetchPonds(); // Refresh user list
    } catch (error) {
      console.error("Error approving ponds:", error);
    }
  };
  // Delete a user
  const deletePond = async (pond_id) => {
    try {
      await axios.delete(`http://localhost:8000/api/ponds/${pond_id}`);
      fetchPonds(); // Refresh user list
    } catch (error) {
      console.error("Error deleting ponds:", error);
    }
  };

  useEffect(() => {
    fetchPonds();
  }, []);

  return (
    <div className="pond-management">
      <h1>Pond Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Pond ID</th>
              <th>Channel ID</th>
              <th>Pond Name</th>
              <th>Pond Location</th>
              <th>Fish ID</th>
              <th>User ID</th>
              <th>Pond Status</th>
            </tr>
          </thead>
          <tbody>
            {ponds.map((pond) => (
              <tr key={pond.pond_id}>
                <td>{pond.pond_id}</td>
                <td>{pond.channel_id}</td>
                <td>{pond.pond_name}</td>
                <td>{pond.pond_loc}</td>
                <td>{pond.fish_id}</td>
                <td>{pond.user_id}</td>
                <td>
                  {pond.status === "waiting_for_approval" && (
                    <button className="approve-button" onClick={() => approvePond(pond.pond_id)}>Approve</button>
                  )}
                  <button className="delete-button" onClick={() => deletePond(pond.pond_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PondManagement;
