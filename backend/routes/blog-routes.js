
import express from "express";
import { addBlogPost, getAllBlogPosts, updateBlogPost, getBlogPostById, deleteBlogPostById, getUserBlogsById } from "../controller/blog-controller";


const blogRouter = express.Router()

blogRouter.get("/", getAllBlogPosts)
blogRouter.post("/addpost", addBlogPost)
blogRouter.put("/:id", updateBlogPost)
blogRouter.get("/:id", getBlogPostById)
blogRouter.delete("/:id", deleteBlogPostById)
blogRouter.get("/user/:id", getUserBlogsById)


export default blogRouter;