import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog {
    "content": string,
    "title": string,
    "id": string,
    "author": {
        "name": string | null
    }
}

export const useBlog = ({id}: {id: string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            })
            .then((res) => {
                setBlog(res.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BACKEND_URL}/api/v1/blog`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            })
            .then((res) => {
                setBlogs(res.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}