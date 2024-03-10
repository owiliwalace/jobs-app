
"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
   
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from 'next/image'
 function Auth() {
  return (
    <>
    <div className="flex">
    <Image
    className=' w-1/2'
      src="/auth.jpg"
      width={400}
      height={400}
      alt="image one"
    />
   
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">username</Label>
              <Input id="username" placeholder="username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">password</Label>
              <Input id="password" placeholder="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>LOGIN</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register Me!</CardTitle>
           
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Full name</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">email</Label>
              <Input id="new" type="password" />
            </div>

            <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select your are of expertise" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Jobs</SelectLabel>
          <SelectItem value="intern">Intern</SelectItem>
      <SelectItem value="freelancer">Freelancer</SelectItem>
      <SelectItem value="contractor">Contractor</SelectItem>
      <SelectItem value="temp">Temporary Employee</SelectItem>
      <SelectItem value="seasonal">Seasonal Worker</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

          </CardContent>
          <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
    </>
  )
}
export default Auth