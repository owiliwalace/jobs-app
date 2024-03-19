import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  
const TotalHours = () => {
  return (
    <>
     <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total Hours</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">6hrs</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    </>
  )
}

export default TotalHours
