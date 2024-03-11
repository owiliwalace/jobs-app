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
import NewEmployee from './NewEmployee';

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "register"));

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

const Registrations = () => {
  const [totalEmployees, setTotalEmployees] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleClick = (employeeData) => {
    setSelectedEmployee(employeeData);
  };

  return (
    <>
      <Link to="/new" onClick={() => handleClick(selectedEmployee)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>New Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
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
