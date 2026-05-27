import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { Edit3 } from "lucide-react"
import { Link, useLocation } from "react-router"

export const NavBar = () => {
  const { pathname } = useLocation()
  const showWrite = pathname === "/blogs" || pathname.startsWith("/blog/") || pathname.startsWith("/blogs/")
  const showSearch =
    pathname === "/blogs" || pathname.startsWith("/blog/") || pathname.startsWith("/blogs/")

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <div className="flex w-full items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className="font-black text-3xl focus:outline-none focus-visible:outline-none"
            >
              <Link
                to="/blogs"
                onClick={(event) => {
                  handleLogoClick()
                  event.currentTarget.blur()
                }}
                className="focus:outline-none focus-visible:outline-none"
              >
                BlogIt
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {showSearch && <Input className="max-w-50" placeholder="Search" />}
      <div className="ml-auto flex items-center gap-3">
        {showWrite && (
          <Link
            to="/publish"
            className="flex items-center gap-2 border border-border/60 px-3 py-2 text-xs font-medium text-foreground hover:bg-accent/40 transition"
          >
            <Edit3 className="h-4 w-4" />
            Write
          </Link>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}