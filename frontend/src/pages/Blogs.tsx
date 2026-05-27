import { BlogCard } from "@/components/blog-card"
import { BlogCardSkeleton } from "@/components/blog-skeleton";
import { NavBar } from "@/components/nav-bar"
import { getAuthorName, useBlogs } from "@/hooks"
import { formatDate } from "@/lib/utils";
import { Link, Navigate } from "react-router";

export const Blogs = () =>{
    const token = localStorage.getItem("token");
    const {loading,blogs} = useBlogs();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if(loading){
        return ( 
        <div>
            <div className="pb-4 border-b">
                <NavBar />
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                </div>
            </div>
        </div>
        )
    }
    return(
    <div>
        <div className="pb-4 border-b">
            <NavBar />
        </div>

        <div className="flex justify-center">
            <div className="w-full max-w-4xl">
                    {blogs.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="mx-auto max-w-md">
                                <div
                                    aria-hidden="true"
                                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-border/60 bg-white text-black font-black text-3xl"
                                >
                                    B
                                </div>
                                <h2 className="text-2xl font-bold">No blogs yet.</h2>
                                <p className="mt-2 text-muted-foreground">
                                    Be the first to post on BlogIt—share a story, a tutorial, or a quick thought.
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        to="/publish"
                                        className="inline-flex items-center justify-center border border-border/60 bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90 transition"
                                    >
                                        Write the first post
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        blogs.map(blog => <BlogCard   
                            key={blog.id}
                            authorName = {getAuthorName(blog.author)}
                            title = {blog.title}
                            content = {blog.content}
                            publishedDate = {blog.published ? formatDate(blog.published) : "Unknown Date"}
                            id ={blog.id} 
                        />)
                    )} 
                </div>
        </div>
    </div>
    )
}