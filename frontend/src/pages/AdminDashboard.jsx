import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import "../styles/common.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nextStatus, setNextStatus] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/users?page=${page}`);
      setUsers(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  
  const openModal = (user, status) => {
    setSelectedUser(user);
    setNextStatus(status);
    setShowModal(true);
  };

  
  const confirmStatusChange = async () => {
    await api.patch(`/admin/users/${selectedUser._id}/status`, {
      status: nextStatus,
    });
    setShowModal(false);
    fetchUsers();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Admin Dashboard</h2>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.fullName}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <span
                          className={
                            u.status === "active"
                              ? "status-active"
                              : "status-inactive"
                          }
                        >
                          {u.status}
                        </span>
                      </td>
                      <td>
                        {u.status === "active" ? (
                          <Button
                            variant="danger"
                            onClick={() => openModal(u, "inactive")}
                          >
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={() => openModal(u, "active")}
                          >
                            Activate
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>

            <span>Page {page}</span>

            <Button
              variant="secondary"
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      
      {showModal && (
        <Modal
          title="Confirm Action"
          message={`Are you sure you want to ${nextStatus} this user?`}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmStatusChange}
        />
      )}
    </>
  );
};

export default AdminDashboard;
