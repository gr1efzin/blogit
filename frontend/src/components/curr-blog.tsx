import { getAuthorName, type Blog } from "@/hooks"
import { formatDate } from "@/lib/utils"
import { Trash2 } from "lucide-react"

interface CurrBlogProps {
    blog: Blog
    canDelete?: boolean
    isDeleting?: boolean
    onDelete?: () => void
}

export const CurrBlog = ({ blog, canDelete = false, isDeleting = false, onDelete }: CurrBlogProps) =>{
    return (
        <>
            <article className="mx-auto w-full max-w-3xl px-4 py-8">
                {canDelete && onDelete && (
                    <div className="flex justify-end pb-2">
                        <button
                            type="button"
                            aria-label="Delete blog"
                            onClick={onDelete}
                            className="text-muted-foreground transition hover:text-red-500"
                            disabled={isDeleting}
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                )}
                <div className="text-left text-3xl font-black leading-tight pb-3">
                    {blog.title}
                </div>
                <div className="flex justify-start text-sm font-extralight pb-5">
                    <div className="pr-1 cursor-default">
                        {getAuthorName(blog.author)}
                    </div>
                    <div className="cursor-default">&bull; </div>
                    <div className="pl-1 cursor-default">{blog.published ? formatDate(blog.published) : "Unknown Date"}</div>
                </div>
                <div className="text-base font-normal leading-7 text-foreground">
                    {blog.content}
                </div>
            </article>

        </>
    )
}