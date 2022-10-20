import axios from 'axios'
import React, { createContext } from 'react'
import { toastErrorNotify, toastSuccessNotify } from '../helper/helper';


export const BlogData = createContext()
const initialValue = {
    title: "",
    category: "",
    content: "",
    image: "",
    status: ""
}
const url = "http://127.0.0.1:8000/"

const BlogContext = ({ children }) => {
    const [posts, setPosts] = useState(JSON.parse(sessionStorage.getItem("posts")) || initialValue)
    const [category, setCategory] = useState(JSON.parse(sessionStorage.getItem("categories")) || "")

    const getCategories = async () => {
        try {
            const res = await axios.get(`${url}blog/category/`)
            setCategory(res.data)
            sessionStorage.setItem("categories", JSON.stringify(res.data))
            console.log(category)
        } catch (error) {
            toastErrorNotify(error.message);
        }
    }

    const getBlogPosts = async () => {
        try {
            const res = await axios.get(`${url}blog/posts/`)
            setPosts(res.data)
            sessionStorage.setItem("posts", JSON.stringify(res.data))
        } catch (error) {
            toastErrorNotify(error.message);
        }
    }

    const createPost = async (blogData) => {
        try {
            const res = await axios.post(`${url}blog/posts/`, blogData)
            if (res.status === 200) {
                getBlogPosts()
                toastSuccessNotify('Blog created successfully')
            }
        } catch (error) {
            toastErrorNotify(error.message);
        }
    }

    const value = {
        posts,
        getCategories,
        getBlogPosts,
        createPost,

    }
    return (
        <BlogData.Provider value={value}>
            {children}
        </BlogData.Provider>
    )
}

export default BlogContext