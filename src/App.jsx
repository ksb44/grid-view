import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchStudentsData } from "./api";

function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("grid");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [activeStudentId, setActiveStudentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentsData();
      setStudents(data);
    };
    fetchData();

    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".hamburger-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setShowHamburgerMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleHamburgerClick = () => {
    setShowHamburgerMenu((prev) => !prev);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setModalType("delete");
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setModalType("edit");
    setShowModal(true);
  };

  const confirmAction = () => {
    setShowModal(false);
  };

  const handlebun = (studentId) => {
    setActiveStudentId((prevId) => (prevId === studentId ? null : studentId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <header className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 mb-8">
        <div className="relative hamburger-menu">
          <button
            className="menu-button text-lg font-semibold text-blue-500 hover:text-purple-500"
            onClick={handleHamburgerClick}
          >
            ☰ Menu
          </button>
          {showHamburgerMenu && (
            <motion.ul
              className="absolute left-0 mt-2 w-48 bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg py-2 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <li className="px-4 py-2 hover:bg-blue-100">Sub-Menu 1</li>
              <li className="px-4 py-2 hover:bg-blue-100">Sub-Menu 2</li>
            </motion.ul>
          )}
        </div>
        <nav className="space-x-4">
          <button
            className="text-lg font-semibold text-blue-500 hover:text-purple-500"
            onClick={() => setView("grid")}
          >
            Grid View
          </button>
          <button
            className="text-lg font-semibold text-blue-500 hover:text-purple-500"
            onClick={() => setView("tile")}
          >
            Tile View
          </button>
        </nav>
      </header>
      <main>
        {view === "grid" && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <motion.div
                key={student.id}
                className="bg-white shadow-lg rounded-lg p-6 transform transition hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {student.name}
                </h2>
                <p className="text-gray-600">Email: {student.email}</p>
                <p className="text-gray-600">Username: {student.username}</p>
                <p className="text-gray-600">Phone: {student.phone}</p>
                <p className="text-gray-600">Website: {student.website}</p>
                <p className="text-gray-600">Company: {student.company.name}</p>
                <p className="text-gray-600">City: {student.address.city}</p>
                <p className="text-gray-600">
                  Street: {student.address.street}
                </p>
                <p className="text-gray-600">Suite: {student.address.suite}</p>
                <p className="text-gray-600">
                  Zipcode: {student.address.zipcode}
                </p>
                <button
                  className="mt-4 text-blue-500 hover:text-purple-500"
                  onClick={() => handleStudentClick(student)}
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {view === "tile" && (
          <motion.div className="flex flex-wrap gap-6">
            {students.map((student) => (
              <motion.div
                key={student.id}
                className="bg-white shadow-lg rounded-lg p-4 w-64 relative"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {student.name}
                </h2>
                <p className="text-gray-600">Email: {student.email}</p>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handlebun(student.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ⋮
                  </button>

                  {activeStudentId === student.id && (
                    <motion.ul
                      className="absolute -right-4 w-20 bg-white rounded-lg shadow-lg py-1 z-20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <li
                        className="px-4 py-2 hover:bg-blue-100"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-blue-100"
                        onClick={() => handleDelete(student)}
                      >
                        Delete
                      </li>
                    </motion.ul>
                  )}
                </div>
                <button
                  className="mt-4 text-blue-500 hover:text-purple-500"
                  onClick={() => handleStudentClick(student)}
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
      {selectedStudent && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {selectedStudent.name}
            </h2>
            <p className="text-gray-600 mb-4">Email: {selectedStudent.email}</p>
            <p className="text-gray-600 mb-4">
              Username: {selectedStudent.username}
            </p>
            <p className="text-gray-600 mb-4">Phone: {selectedStudent.phone}</p>
            <p className="text-gray-600 mb-4">
              Website: {selectedStudent.website}
            </p>
            <p className="text-gray-600 mb-4">
              Company: {selectedStudent.company.name}
            </p>
            <p className="text-gray-600 mb-4">
              City: {selectedStudent.address.city}
            </p>
            <p className="text-gray-600 mb-4">
              Street: {selectedStudent.address.street}
            </p>
            <p className="text-gray-600 mb-4">
              Suite: {selectedStudent.address.suite}
            </p>
            <p className="text-gray-600 mb-4">
              Zipcode: {selectedStudent.address.zipcode}
            </p>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedStudent(null)}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-sm w-full relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">
              {modalType === "delete" ? "Confirm Delete" : "Edit Student"}
            </h3>
            {modalType === "delete" ? (
              <p>Are you sure you want to delete {selectedStudent.name}?</p>
            ) : (
              <p>Editing details for {selectedStudent.name}...</p>
            )}{" "}
            <div className="mt-4 flex justify-end space-x-4">
              {" "}
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>{" "}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={confirmAction}
              >
                Confirm
              </button>{" "}
            </div>{" "}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>{" "}
          </motion.div>{" "}
        </motion.div>
      )}{" "}
    </div>
  );
}
export default App;
