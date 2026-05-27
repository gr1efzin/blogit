import { BlogCardSkeleton } from "@/components/blog-skeleton"
import { CurrBlog } from "@/components/curr-blog"
import { NavBar } from "@/components/nav-bar"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { BACKEND_URL } from "@/config"
import { invalidateBlogFromCache, useBlog } from "@/hooks"
import axios from "axios"
import { useState } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router"

export const Blog = () =>{
    const token = localStorage.getItem("token");
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {loading, blog} = useBlog({
        id: id || ""
    });
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
    if(!blog){
        return <div>
            Blog not found.
        </div>
    }

    const previousPath =
        typeof location.state === "object" &&
        location.state !== null &&
        "from" in location.state &&
        typeof location.state.from === "string"
            ? location.state.from
            : "/blogs";

    const handleDelete = async () => {
        if (!id || !token) return;

        try {
            setIsDeleting(true);
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            invalidateBlogFromCache(id);
            navigate(previousPath === "/blogs/my-blogs" ? "/blogs/my-blogs" : "/blogs");
        } catch (e) {
            setIsDeleting(false);
        }
    }
     
    return(
        <>
            <div className="pb-4 border-b">
                <NavBar/>
            </div>
            <div className="flex justify-center">
                <CurrBlog
                    blog={blog}
                    canDelete={!!blog.isOwner}
                    isDeleting={isDeleting}
                    onDelete={() => setShowDeleteDialog(true)}
                />
            </div>
            <ConfirmDialog
                open={showDeleteDialog}
                title="Are you sure you want to delete this blog?"
                description="This action cannot be undone."
                confirmText={isDeleting ? "Deleting..." : "Delete"}
                cancelText="Cancel"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteDialog(false)}
                confirmDisabled={isDeleting}
            />
        </>
    )
}