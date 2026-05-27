import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog {
    "content": string,
    "title": string,
    "id": string,
    "published": string,
    "isOwner"?: boolean,
    "author": {
        "name": string | null
    }
}

export const DEFAULT_AUTHOR_NAME = "Anonymous";

export const getAuthorName = (author?: Blog["author"] | null) =>
    author?.name ?? DEFAULT_AUTHOR_NAME;

const blogCache = new Map<string, Blog>();

export const invalidateBlogFromCache = (id: string) => {
    blogCache.delete(id);
}

export const useBlog = ({id}: {id: string}) =>{
    const [loading, setLoading] = useState(() => !blogCache.has(id));
    const [blog, setBlog] = useState<Blog | undefined>(() => blogCache.get(id));

    useEffect(() => {
        const cachedBlog = blogCache.get(id);
        if (cachedBlog) {
            setBlog(cachedBlog);
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        setBlog(undefined);
        setLoading(true);
        axios
            .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const fetchedBlog = res.data.blog as Blog;
                blogCache.set(id, fetchedBlog);
                setBlog(fetchedBlog);
                setLoading(false);
            })
            .catch(() => {
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
        if (!token) {
            setLoading(false);
            return;
        }
        axios
            .get(`${BACKEND_URL}/api/v1/blog`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setBlogs(res.data.blogs);
                setLoading(false);
            })
            .catch(() => {
                setBlogs([]);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}

export const useMyBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        axios
            .get(`${BACKEND_URL}/api/v1/blog/my-blogs`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setBlogs(res.data.blogs);
                setLoading(false);
            })
            .catch(() => {
                setBlogs([]);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}