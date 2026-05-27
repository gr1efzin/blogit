import { CurrBlog } from "@/components/curr-blog"
import { NavBar } from "@/components/nav-bar"
import { useBlog } from "@/hooks"
import { useParams } from "react-router"

export const Blog = () =>{
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(loading){
        return <div>
            loading...
        </div>
    }
    if(!blog){
        return <div>
            Blog not found.
        </div>
    }
     
    return(
        <>
            <div className="pb-4 border-b">
                <NavBar/>
            </div>
            <div className="flex justify-center">
                <CurrBlog blog = {blog} />
            </div>
        </>
    )
}