import { BlogCardSkeleton } from "@/components/blog-skeleton";
import { MyBlogsCard } from "@/components/my-blogs-card";
import { NavBar } from "@/components/nav-bar";
import { getAuthorName, useMyBlogs } from "@/hooks";
import { formatDate } from "@/lib/utils";
import { Navigate } from "react-router";

export const MyBlogs = () =>{
  const token = localStorage.getItem("token");
  const { loading, blogs } = useMyBlogs();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
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

  return (
    <div>
      <div className="pb-4 border-b">
        <NavBar />
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {blogs.map((blog) => (
            <MyBlogsCard
              key={blog.id}
              authorName={getAuthorName(blog.author)}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.published ? formatDate(blog.published) : "Unknown Date"}
              id={blog.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
