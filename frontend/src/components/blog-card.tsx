import { Link } from "react-router"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}


export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) =>{
    return (
        
    <div className="p-4 border-b-1 border-slate-250 pb-5">
        <div className="flex justify-start text-xs">

        <div className="pr-1 font-medium cursor-default">{authorName}</div>
        <div className="cursor-default">&bull; </div>
        <div className="font-thin pl-1 cursor-default">{publishedDate}</div>

        </div>
        <Link to = {`/blog/${id}`}>
        <div className="text-xl font-black pt-2 cursor-pointer">
            {title}
        </div>

        <div className="text-base font-extralight cursor-pointer">
            {content.slice(0,100) + "..."}
        </div>
            </Link>
    </div>

    )
}