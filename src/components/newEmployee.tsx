"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { Link } from 'react-router-dom';

// Define the Employee type if it's not already defined
// Adjust the type according to your actual data structure
interface Employee {
  id: string;
  // Add other properties if needed
}

async function fetchDataFromFirestore(): Promise<Employee[]> {
  const querySnapshot = await getDocs(collection(db, "register"));

  const data: Employee[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Employee);
  });
  return data;
}

const Registrations = () => {
  const [totalEmployees, setTotalEmployees] = useState<number | null>(null);
  //const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await fetchDataFromFirestore();
        setTotalEmployees(data.length);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

 
  return (
    <>
      {/* Use a div or another wrapper if Link does not support onClick directly */}
      <Link to="/new" >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>New Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {/* Display the total number of employees */}
                <p>{totalEmployees !== null ? totalEmployees : "Loading..."}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default Registrations;
