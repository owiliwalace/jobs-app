"use client"
// Import necessary modules
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgp4CYYQgZVxKchcpPYabgqZ5E-ghMd4A",
  authDomain: "jobs-app-36698.firebaseapp.com",
  projectId: "jobs-app-36698",
  storageBucket: "jobs-app-36698.appspot.com",
  messagingSenderId: "851908767635",
  appId: "1:851908767635:web:f350c9041fb3247f6d4266",
  measurementId: "G-Y0J9MBBKKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to add user details to Firestore
async function addDataToFirestore(name, fullName, email, category, password) {
  try {
    // Create a new user in Firebase Authentication
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Add user details to Firestore
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      fullName: fullName,
      email: email,
      category: category,
    });

    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding user:", error.message);
    return false;
  }
}

const NewEmployee = () => {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFirestore(name, fullName, email, category, password);
    if (added) {
      setName("");
      setFullName("");
      setEmail("");
      setCategory("");
      setPassword("");
      alert("User registered and data added successfully");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg w-[500px]"
    >
      <h2 className="text-2xl font-bold mb-4">Add a new Employee</h2>
      <div className="mb-4 flex">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='bg-slate-300'
        />
      </div>
      <div className="mb-4 flex">
        <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
          Full name:
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className='bg-slate-300'
        />
      </div>
      <div className="mb-4 flex">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-slate-300'
        />
      </div>
      <div className="mb-4 flex">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
          Category:
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='bg-slate-300'
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-slate-300'
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default NewEmployee;
