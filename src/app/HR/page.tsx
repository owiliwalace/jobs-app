
"use client"

  import Header from "@/components/header"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 

  
  const TableDemo =() => {
    return (
    <>
    <Header />
      <Card className=" ">
    <div className="flex gap-5">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total employees</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total Hours</CardTitle>
      </CardHeader>
      <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label> 
            </div>
          </div>
      </CardContent>
    </Card>
    </div>

    <div className="flex">

   
   <div className="">Dashboard</div>
    
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
       
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </div>
      </Card>
      </>
    )
  }
  export default TableDemo;
  