"use client";



import { getAuth,signOut } from "firebase/auth";
import {app} from '../../app/firebaseConfig'
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import CalendarDemo from "@/components/dashboard/calender";
import QRCodeArea from "@/components/dashboard/qrCode";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { error } from "console";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  startDate: string;
  endDate: string;
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

const Home: React.FC = () => {
const auth =getAuth(app)
const router = useRouter();
const handleLogout= async()=>{
  try{
    await signOut(auth);
    router.push('/auth')
  }catch (error){
    console.error(error);
  }

}




  const [userData, setUserData] = useState<Message[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []);



 

  async function fetchData() {
    // Fetch data from Firestore
    const data = await fetchDataFromFirestore();
    setUserData(data);
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Menubar className="justify-end">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>New Incognito Window</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
            onClick={handleLogout}>Logout</MenubarTrigger>
            
          </MenubarMenu>
          <MenubarMenu>
            <Avatar className="right-0 ml-64">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className=""
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MenubarMenu>
        </Menubar>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="flex">
          <QRCodeArea />
          <>
            <ScrollArea className="h-96 w-[500px] rounded-md border">
              <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="font-bold">Messages</div>
                {userData.map((user) => (
                  <div
                    key={user.id}
                    className="mb-4 shadow-sm py-2 px-4"
                  >
                    <p className="text-md font-light">
                      <span className="font-semibold">Sent to: </span>
                      {user.name}
                    </p>
                    <p className="text-md font-light">
                      {user.email}
                    </p>
                    <div>
                      <p className="text-sm font-light">
                        <span className="font-semibold">
                          Start:
                        </span>
                        {user.startDate}
                      </p>
                      <p className="text-sm font-light">
                        <span className="font-semibold">
                          End:
                        </span>
                        {user.endDate}
                      </p>
                    </div>
                    <p className="text-md font-light">
                      <span className="font-semibold">
                        Message:{" "}
                      </span>
                      {user.message}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
          <CalendarDemo />
        </div>
      </div>
    </div>
  );
};

export default Home;
