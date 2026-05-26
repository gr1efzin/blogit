import { BlogCard } from "@/components/blog-card"

export const Blogs = () =>{
    return(
    <>
    <BlogCard
        authorName = {"Subhajit"}
        title = {"title of the blog"}
        content = {"content of the blog"}
        publishedDate = {"25th May 2026"}
    />
    </>
    )
}