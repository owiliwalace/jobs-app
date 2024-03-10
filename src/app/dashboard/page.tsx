import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

function Dashboard() {
  return (
    <>
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Vee Jobs-App</MenubarTrigger>
        
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Jobs</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Progress
          </MenubarCheckboxItem>
          <MenubarSeparator />
          
          <MenubarSeparator />
          <MenubarItem inset>Hours</MenubarItem>
          <MenubarSeparator />
          
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profile</MenubarTrigger>
        
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Exit</MenubarTrigger>
        
      </MenubarMenu>
    </Menubar>
  
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Side Menu</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Vee-Jobs-App</SheetTitle>
          <SheetDescription>
          Search
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
             Dashboard
            </Label>
            
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Profile
            </Label>
        
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Logut</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </>
  )
}
export default Dashboard