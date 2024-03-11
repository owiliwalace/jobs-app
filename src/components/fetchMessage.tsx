
import {db}from "../app/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { ScrollArea } from "@/components/ui/scroll-area"
import React,{useState, useEffect} from 'react';

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db,"messages"))
  
  const data=[];
  querySnapshot.forEach((doc) => {
    data.push({id:doc.id, ...doc.data()});

  });
  return data;
  
}

const FetchMessage = () => {
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
       <ScrollArea className="h-96 w-[500px] rounded-md border">
    
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className=" font-bold">Sent Messages</div>
      {userData.map((user) => (
        <div key={user.id} className="mb-4  shadow-sm py-2 px-4">
          <p className="text-xl font-light ">{user.name}</p>
          <p className="text-xl font-light">{user.email}</p>
          <p className="text-xl font-light">{user.message}</p>
        </div>
      ))}
    </div>
    </ScrollArea>

    </>
  )
}

export default FetchMessage 