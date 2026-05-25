import { BrowserRouter, Route, Routes } from "react-router"
import { Blog } from "./pages/Blog"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { ModeToggle } from "./components/mode-toggle"

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background text-foreground">
        <div className="fixed right-4 top-4 z-50">
          <ModeToggle />
        </div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App