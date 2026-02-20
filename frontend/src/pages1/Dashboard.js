import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate=useNavigate();

  const [newStudent, setNewStudent] = useState({
    name: "",
    dob: "",
    email: "",
    mobile_no: "",
    address: "",
  });


  const handleNewData = (field, value) => {
    setNewStudent({
      ...newStudent,
      [field]: value,
    });
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post("/addStudent", newStudent);
      console.log(res.data);
      alert(res.data.message);
      setShowForm(false);
      setNewStudent({
        name: "",
        dob: "",
        email: "",
        mobile_no: "",
        address: "",
      });
      getStudents();
    }
      catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  const user = JSON.parse(localStorage.getItem("role"));

  const handleDelete=async(id)=>{
    try{
      const res=await axios.delete(`/deleteStudent/${id}`);
      alert(res.data.message);
      getStudents();
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };  

  const handleSave=async(id)=>{
    try{
      const res=await axios.put(`/updateStudent/${id}`,newStudent);
      alert(res.data.message);
      setEditId(null);
      getStudents();
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/getStudents");
      console.log(res.data);
      setData(res.data.students);
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout=()=>{
    if(window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  useEffect(() => {
    getStudents();
    const userData = JSON.parse(localStorage.getItem("role"));
    if (!userData?.role) {
      navigate("/");
    }
  }, []);

 return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-x-hidden">

    {loading && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-pink-500 border-r-purple-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold tracking-wide">
            Loading Dashboard...
          </h2>
        </div>
      </div>
    )}

    {/* HEADER */}
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-8 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
          S
        </div>
        <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
          Student DB
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-lg sm:text-xl">{user.role}</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </header>

    {/* FORM MODAL */}
    {showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Add New Student
          </h2>

          <div className="space-y-4">
            {["name", "dob", "email", "mobile_no", "address"].map((field) => (
              <input
                key={field}
                type={
                  field === "dob"
                    ? "date"
                    : field === "email"
                    ? "email"
                    : field === "mobile_no"
                    ? "number"
                    : "text"
                }
                placeholder={field.toUpperCase()}
                onChange={(e) => handleNewData(field, e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            ))}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* CONTENT */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Welcome {user.name} !
        </h2>
        <p className="text-gray-300 mt-1 text-sm sm:text-base">
          Here is the list of all registered students.
        </p>
      </div>

      {user.role === "admin" && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition"
          >
            + Add Student
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-4">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-pink-300">
                <th className="py-3 px-4">S.NO</th>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">DOB</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">MOBILE</th>
                <th className="py-3 px-4">ADDRESS</th>
                {user.role === "admin" && (
                  <th className="py-3 px-4 text-center">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {data.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-b border-white/10 hover:bg-white/10 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{student.id}</td>

                  {["name", "dob", "email", "mobile_no", "address"].map(
                    (field) => (
                      <td key={field} className="py-3 px-4">
                        {editId === student.id ? (
                          <input
                            type={field === "dob"?"date":field==="email"?"email":field==="mobile_no"?"number":"text"}
                            defaultValue={student[field]}
                            onChange={(e) =>
                              handleNewData(field, e.target.value)
                            }
                            className="bg-white/20 px-2 py-1 rounded w-full min-w-[120px]"
                          />
                        ) : (
                          student[field]
                        )}
                      </td>
                    )
                  )}

                  {user.role === "admin" && (
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2 min-w-[150px]">
                        {editId === student.id ? (
                          <>
                            <button
                              onClick={() => handleSave(student.id)}
                              className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="px-3 py-1 bg-gray-500 rounded-lg hover:bg-gray-600 transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditId(student.id)}
                              className="px-3 py-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(student.id)}
                              className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
);
};

export default Dashboard;
