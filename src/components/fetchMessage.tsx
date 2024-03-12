import { db } from "../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  // Add other properties if needed
}

async function fetchDataFromFirestore(): Promise<Message[]> {
  const querySnapshot = await getDocs(collection(db, "messages"));

  const data: Message[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Message);
  });
  return data;
}

const FetchMessage = () => {
  const [userData, setUserData] = useState<Message[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <ScrollArea className="h-96 w-[500px] rounded-md border">
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
          <div className="font-bold">Sent Messages</div>
          {userData.map((user) => (
            <div key={user.id} className="mb-4 shadow-sm py-2 px-4">
              <p className=" text-md font-light"><span className="font-semibold">Sent to: </span>{user.name}</p>
              <p className="text-md font-light">{user.email}</p>
              <p className="text-md font-light"><span className="font-semibold">Message: </span>{user.message}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default FetchMessage;
