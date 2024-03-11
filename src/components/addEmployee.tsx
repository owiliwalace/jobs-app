import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  
const AddEmployee = () => {
  return (
    <>
     <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    </>
  )
}

export default AddEmployee
