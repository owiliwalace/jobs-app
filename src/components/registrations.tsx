// components/TotalEmployees.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import Link from 'next/link';

// Define the type for registration data
interface Registration {
  id: string;
  // Add other properties if needed
}

async function fetchDataFromFirestore(): Promise<Registration[]> {
  const querySnapshot = await getDocs(collection(db, "register"));

  const data: Registration[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Registration);
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
      <Link href="/new">
        
          <Card className="w-[350px] cursor-pointer">
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* Display the total number of registrations */}
                  <p>{totalEmployees !== null ? totalEmployees : "Loading..."}</p>
                </div>
              </div>
            </CardContent>
          </Card>
       
      </Link>
    </>
  );
};

export default TotalEmployees;
