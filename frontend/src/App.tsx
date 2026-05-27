import { BrowserRouter, Route, Routes } from "react-router"
import { Blog } from "./pages/Blog"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { HomePage } from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App