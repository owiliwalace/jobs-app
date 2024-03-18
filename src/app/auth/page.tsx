"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from "../../app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Register from '@/components/dashboard/register';
import Login from '@/components/dashboard/login';
import SignInScreen from '@/components/dashboard/login';

async function addDataToFirestore(
  name: string,
  username: string,
  email: string,
  phoneNumber: string,
  expertise: string
): Promise<boolean> {
  try {
    const docRef = await addDoc(collection(db, "register"), {
      name: name,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      expertise: expertise,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
    return false;
  }
}


function Auth() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expertise, setExpertise] = useState("");

  const handleRegister = async () => {
    const added = await addDataToFirestore(name, username, email, phoneNumber, expertise);
    if (added) {
      // Reset form fields or navigate to a success page
      setName("");
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setExpertise("");
      alert("Registration successful!");
    }
  };

  return (
    <>
      <div className="flex">
        <Image
          className='w-1/2'
          src="/auth.jpg"
          width={400}
          height={400}
          alt="image one"
        />

        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">

      
        <SignInScreen />
      </TabsContent>
        

          
          <TabsContent value="register">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Auth;
