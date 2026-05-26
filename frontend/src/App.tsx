import { BrowserRouter, Route, Routes } from "react-router"
import { Blog } from "./pages/Blog"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Blogs } from "./pages/Blogs"

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App