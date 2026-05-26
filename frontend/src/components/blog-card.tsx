interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}


export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) =>{
    return (
    <div className="border-b-1 border-gray-250 pb-5">
        <div className="flex justify-start">

        <div className="pr-1 font-medium">{authorName}</div>
        <div>&bull; </div>
        <div className="font-thin pl-1">{publishedDate}</div>

        </div>

        <div className="text-xl font-extrabold">
            {title}
        </div>

        <div className="text-base font-extralight">
            {content.slice(0,100) + "..."}
        </div>

        <div ></div>
    </div>
    )
}