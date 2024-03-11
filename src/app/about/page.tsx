"use client"
import {db}from "../firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

import React,{useState, useEffect} from 'react';

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db,"messages"))
  
  const data=[];
  querySnapshot.forEach((doc) => {
    data.push({id:doc.id, ...doc.data()});

  });
  return data;
  
}

const About = () => {
  const [userData, setUserData]=useState([]);
  useEffect(() => {
    async function fetchData() {
      const data =await fetchDataFromFirestore();
      setUserData(data);
      
    }
    fetchData();
  },[]);
  return (
    <>
    
    <div className="">
      {userData.map((user) => (
        <div key={user.id} className="mb-4">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-xl font-semibold">{user.email}</p>
          <p className="text-xl font-semibold">{user.message}</p>
        </div>
      ))}
    </div>

    </>
  )
}

export default About