"use client"
import React, { useState, useEffect } from 'react';
import { db } from "../../app/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

async function addDataToFirestore(name, message, startDate, endDate) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      message: message,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
    });
    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}

export function Message({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 2, 20),
    to: addDays(new Date(2024, 3, 20), 20),
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [employeeNames, setEmployeeNames] = useState([]);

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const names = querySnapshot.docs.map((doc) => doc.data().name);
        setEmployeeNames(names);
      } catch (error) {
        console.error("Error fetching employee names:", error);
      }
    };

    fetchEmployeeNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      alert("Please select a date");
      return;
    }

    const startDate = new Date(date.from);
    const endDate = date.to ? new Date(date.to) : null;

    const added = await addDataToFirestore(name, message, startDate, endDate);
    if (added) {
      setName("");
      setMessage("");
      setDate(undefined);
      alert("Message sent!!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg w-[500px]"
    >
      <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Username:
        </label>
        <select
          required
          id="name"
          className="w-full px-3 border rounded-lg focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="" disabled>
            Select a recipient
          </option>
          {employeeNames.map((employeeName, index) => (
            <option key={index} value={employeeName}>
              {employeeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message:
        </label>
        <textarea
          rows={5}
          id="message"
          className="w-full px-3 border rounded-lg focus:outline-none focus:border-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default Message;
