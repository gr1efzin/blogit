
import { NavBar } from '@/components/nav-bar'
import { ArrowRight, Zap, Users, BookOpen } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

export function HomePage() {
  const navigate = useNavigate()

  const handleAuthLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const token = localStorage.getItem("token")
    if (!token) return

    event.preventDefault()
    navigate("/blogs")
  }

  return (
    <div className="bg-background text-foreground font-mono min-h-screen">
  
      <NavBar />
      <section className="border-b border-border py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Write. Share. Inspire.
          </h2>
          <p className="text-lg opacity-70 mb-8 max-w-2xl mx-auto leading-relaxed">
            The modern blogging platform built for writers who want to focus on what matters most — their words. Clean, distraction-free, and powerful.
          </p>
          <Link
            to={"/login"}
            onClick={handleAuthLink}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 transition  text-white font-semibold flex items-center gap-2 justify-center w-fit mx-auto"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      
      <section id="features" className="border-b border-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-16 text-center">Why writers choose BlogIt</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="border border-border rounded p-8 hover:bg-secondary/20 transition">
              <Zap className="w-8 h-8 mb-4 text-red-600" />
              <h4 className="text-xl font-bold mb-3">Distraction-Free Writing</h4>
              <p className="text-sm opacity-70 leading-relaxed">
                A minimal, focused interface that gets out of your way. Write in peace, without notifications or distractions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-border rounded p-8 hover:bg-secondary/20 transition">
              <Users className="w-8 h-8 mb-4 text-red-600" />
              <h4 className="text-xl font-bold mb-3">Build Your Audience</h4>
              <p className="text-sm opacity-70 leading-relaxed">
                Grow your readership with built-in sharing tools, email subscriptions, and community features.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-border rounded p-8 hover:bg-secondary/20 transition">
              <BookOpen className="w-8 h-8 mb-4 text-red-600" />
              <h4 className="text-xl font-bold mb-3">Powerful Tools</h4>
              <p className="text-sm opacity-70 leading-relaxed">
                Rich text editor, scheduled publishing, analytics, and more. Everything a writer needs to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to start writing?</h3>
          <p className="text-lg opacity-70 mb-8">
            Join thousands of writers already publishing on BlogIt. It takes less than a minute to get started.
          </p>
          <Link
            to={"/signup"}
            onClick={handleAuthLink}
            className="inline-flex px-8 py-4 bg-red-600 hover:bg-red-700 transition text-white font-semibold gap-2"
          >
            Create Your Account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
