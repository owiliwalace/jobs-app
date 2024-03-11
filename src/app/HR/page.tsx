
"use client"

import {db}from "../firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

import React,{useState, useEffect} from 'react';



  import Header from "@/components/header"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Message from "@/components/hr/message"
import FetchMessage from "@/components/fetchMessage"
import TotalEmployees from "@/components/totalEmployees";
import TotalHours from "@/components/totalHours";
import AddEmployee from "@/components/addEmployee";
import Registrations from "@/components/registrations";

interface Employee {
  id: string;
  name: string;
  category: string;
  // Add other properties if needed
}
 
async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db,"employees"))
  
  const data: Employee[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Employee);
  });
  return data;
}
  
const TableDemo = () => {
  const [userData, setUserData] = useState<Employee[]>([]); // Provide the type here

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }

    fetchData();
  }, []);
    return (
    <>
    <Header />
      <Card className=" ">
    <div className="flex gap-5">
  <TotalEmployees/>
  <TotalHours />
  <AddEmployee />
  <Registrations />
   
    </div>

    <div className="flex">

   
   <Message />
    
      <Table>
        <TableCaption>A list of your employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[500px]">Employee Name</TableHead>
            <TableHead className="text-right">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {userData.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium ">{user.name}</TableCell>
            <TableCell className="text-right">{user.category}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
       
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            
          </TableRow>
        </TableFooter>
      </Table>
          <FetchMessage />
      </div>
      </Card>
      </>
    )
  }
  export default TableDemo;
  