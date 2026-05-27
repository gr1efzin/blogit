import { getAuthorName, type Blog } from "@/hooks"

export const CurrBlog = ({blog}:{blog: Blog}) =>{
    return (
        <>
            <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8">
                <div className="text-3xl font-black leading-tight">
                    {blog.title}
                </div>
                <div className="flex justify-start text-sm font-extralight pb-5">
                    <div className="pr-1 cursor-default">
                        {getAuthorName(blog.author)}
                    </div>
                    <div className="cursor-default">&bull; </div>
                    <div className="pl-1 cursor-default">{"25th May,2026"}</div>
                </div>
                <div className="text-base font-normal leading-7 text-foreground">
                    {blog.content}
                </div>
            </div>

        </>
    )
}