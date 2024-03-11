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
            {/* Login form content */}
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register Me!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Full name</Label>
                  <Input
                    id="current"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Email</Label>
                  <Input
                    id="new"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phoneNumber">Phone number</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <Select
               >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select your area of expertise" />
                  </SelectTrigger>
                  <SelectContent
            >
                    <SelectGroup>
                      <SelectLabel>Jobs</SelectLabel>
                      <SelectItem value="intern">Intern</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="temp">Temporary Employee</SelectItem>
                      <SelectItem value="seasonal">Seasonal Worker</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleRegister}>Register</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Auth;
