import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

const Hero = () => {
  return (
    <>
    <div className=" h-[500px] w-full bg-white flex flex-col-reverse mt-40 md:mt-6 md:flex-row md:w-full">
      <div className="h-[500px] w-full md:w-full">
        
        <h2 className='md:w-[700px] mt-4 text-4xl'><b>Run your Payroll 10X faster, Pay Employees On Time,  Always.</b></h2>
<div className='md:w-[600px] w-full text-2xl'>Leave manual payroll management in the past. Embrace an easy to use, automatic, 
and fully integrated system for your processes. Enjoy accurate and timely payrolls, 
and remit all statutory payments easily and on time. 
No matter the size of your business, Workpay is the solution for you. 
      </div>
      </div>
    <Image
    className=' w-1/2'
      src="/hero-homepage.jpg"
      width={500}
      height={500}
      alt="image one"
    />
   
     
    </div>
    
    <div className=" flex flex-col w-full md:flex-row md:w-[96%] gap-5">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>1</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Empower your employees with self-service portals</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>2</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Customize and manage your workforce in your preferred way</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>3</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Guarantee secure data management and employee privacy</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>4</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Increase employee data visibility across regions</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    </div>
    <br/>
    </>
  )
}

export default Hero 