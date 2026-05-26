import { BlogCard } from "@/components/blog-card"
import { NavBar } from "@/components/nav-bar"

export const Blogs = () =>{
    return(
    <div>
        <div id="navbar" className="pb-4 border-b">
            <NavBar />
        </div>
        <div className="flex justify-center">
            <div className="max-w-4xl">
                <BlogCard
                    authorName = {"Subhajit"}
                    title = {"title of the blog title of the blogtitle of the blog"}
                    content = {"content of the blog content of the blogcontent of the blogcontent of the blogcontent of the blogcontent of the blog"}
                    publishedDate = {"25th May 2026"}
                />
                <BlogCard
                    authorName = {"Subhajit"}
                    title = {"title of the blog title of the blogtitle of the blog"}
                    content = {"content of the blog content of the blogcontent of the blogcontent of the blogcontent of the blogcontent of the blog"}
                    publishedDate = {"25th May 2026"}
                />
                <BlogCard
                    authorName = {"Subhajit"}
                    title = {"title of the blog title of the blogtitle of the blog"}
                    content = {"content of the blog content of the blogcontent of the blogcontent of the blogcontent of the blogcontent of the blog"}
                    publishedDate = {"25th May 2026"}
                />
            </div>
        </div>
    </div>
    )
}