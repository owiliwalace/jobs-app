// TotalEmployees.js
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebaseConfig";

// Define the type for employee data
interface Employee {
  id: string;
  // Add other properties if needed
}

async function fetchDataFromFirestore(): Promise<Employee[]> {
  const querySnapshot = await getDocs(collection(db, "employees"));

  const data: Employee[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Employee);
  });

  return data;
}

const TotalEmployees = () => {
  const [totalEmployees, setTotalEmployees] = useState<number | null>(null);

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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Total employees</CardTitle>
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
    </>
  );
};

export default TotalEmployees;
