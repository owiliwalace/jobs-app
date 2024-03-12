import React, { useState, useEffect } from 'react';
import { db } from "../../app/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

async function addDataToFirestore(name, message) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      message: message,
    });
    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}

const Message = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [employeeNames, setEmployeeNames] = useState([]);

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const names = querySnapshot.docs.map((doc) => doc.data().name);
        setEmployeeNames(names);
      } catch (error) {
        console.error("Error fetching employee names:", error);
      }
    };

    fetchEmployeeNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFirestore(name, message);
    if (added) {
      setName("");
      setMessage("");
      alert("Message sent!!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg w-[500px]"
    >
      <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Username:
        </label>
        <select
          required
          id="name"
          className="w-full px-3 border rounded-lg focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="" disabled>
            Select a recipient
          </option>
          {employeeNames.map((employeeName, index) => (
            <option key={index} value={employeeName}>
              {employeeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message:
        </label>
        <textarea
          rows={5}
          id="message"
          className="w-full px-3 border rounded-lg focus:outline-none focus:border-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Message;
