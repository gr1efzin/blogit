import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Edit3 } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"

export const NavBar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const showWrite = pathname === "/blogs" || pathname.startsWith("/blog/") || pathname.startsWith("/blogs/")
  const token = localStorage.getItem("token")
  const isLoggedIn = !!token

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (!dropdownRef.current?.contains(target)) setOpen(false)
    }

    document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [open])

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setOpen(false)
    navigate("/login")
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
                className="focus:outline-none focus-visible:outline-none inline-flex items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center bg-white text-black border border-border/60 font-black leading-none"
                >
                  B
                </span>
                <span>BlogIt</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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

        {isLoggedIn && (
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-label="Account menu"
              className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-sm hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              onClick={() => setOpen((v) => !v)}
            />

            {open && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-md border border-border bg-background shadow-md z-50 overflow-hidden">
                <Link
                  to="/blogs/my-blogs"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-accent/40 transition"
                >
                  My Blogs
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-foreground hover:bg-accent/40 transition text-left"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}