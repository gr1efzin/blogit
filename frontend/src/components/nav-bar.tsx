import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { Link } from "react-router"

export const NavBar = () => {
  return (
    <div className="flex w-full items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="font-black text-3xl">
              <Link to="/blogs">BlogIt</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Input className="max-w-50" placeholder="Search" />
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  )
}