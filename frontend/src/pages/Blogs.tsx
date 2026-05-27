import { BlogCard } from "@/components/blog-card"
import { NavBar } from "@/components/nav-bar"
import { useBlogs } from "@/hooks"

export const Blogs = () =>{
    const {loading,blogs} = useBlogs();
    if(loading){
        return <div>
            loading...
        </div>
    }
    return(
    <div>
        <div className="pb-4 border-b">
            <NavBar />
        </div>

        <div className="flex justify-center ">
            <div className="">
                <div className="max-w-4xl">
                    {blogs.map(blog => <BlogCard   
                        authorName = {blog.author.name ?? "Anonymous"}
                        title = {blog.title}
                        content = {blog.content}
                        publishedDate = {"25th May 2026"}
                        id ={blog.id} 
                    />)} 
                </div>
            </div>
        </div>
    </div>
    )
}