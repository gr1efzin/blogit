import { type Blog } from "@/hooks"

export const CurrBlog = ({blog}:{blog: Blog}) =>{
    return (
        <div>
            <div>
                <div>
                    {blog.title}
                </div>
                <div>
                    {blog.content}
                </div>
            </div>

        </div>
    )
}