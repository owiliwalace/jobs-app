import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { collection, getDocs } from "firebase/firestore"
import {db}from "../app/firebaseConfig"
import { useRouter } from 'next/router';
import Link from 'next/link';
async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db,"register"))
    
    const data=[];
    querySnapshot.forEach((doc) => {
      data.push({id:doc.id, ...doc.data()});
  
    });
    return data;
    
  } // Make sure to provide the correct path

const TotalEmployees = () => {
  const [totalEmployees, setTotalEmployees] = useState(null);
  

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
    <Link href={'/new'}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
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

export default TotalEmployees;
