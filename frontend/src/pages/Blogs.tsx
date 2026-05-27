import { BlogCard } from "@/components/blog-card"
import { NavBar } from "@/components/nav-bar"
import { getAuthorName, useBlogs } from "@/hooks"

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

        <div className="flex justify-center">
                <div className="max-w-4xl">
                    {blogs.map(blog => <BlogCard   
                        authorName = {getAuthorName(blog.author)}
                        title = {blog.title}
                        content = {blog.content}
                        publishedDate = {"25th May 2026"}
                        id ={blog.id} 
                    />)} 
                </div>
        </div>
    </div>
    )
}