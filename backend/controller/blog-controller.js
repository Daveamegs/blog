import mongoose from "mongoose";
import BlogPost from "../model/Blog"
import User from "../model/User";

// Get all blog post
export const getAllBlogPosts = async (req, res, next) => {
    let blogPosts
    try {
        blogPosts = await BlogPost.find();
    } catch (error) {
        return next(error.message || error);
    }

    if (!blogPosts){
       return res.status(404).json({message: 'No blog posts found'}); 
    }

    return res.status(200).json({ data: blogPosts});
}

// Add a blog post
export const addBlogPost = async (req, res, next) => {
    const {title, description, image, user} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return next(error.message || error);
    }
    if (!existingUser){
        return res.status(400).json({message: "You do not have permission to add this blog post"});
    }

    const blogPost = new BlogPost({title, description, image, user});

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blogPost.save({session});
        existingUser.blogs.push(blogPost)
        await existingUser.save({session})
        await session.commitTransaction();

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
    if (!blogPost){
        return res.status(422).json({message: 'Request cannot be processed because of missing required fields'});
    }

    return res.status(201).json({message: 'Post successfully added'});
}

// Update a blog post
export const updateBlogPost = async (req, res, next) => {
    const blogId = req.params.id;
    const {title, description} = req.body;
    let existingBlog;
    try {
        existingBlog = await BlogPost.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        return next(error.message || error)
    }

    if (!existingBlog){
        return res.status(404).json({message: "Blog Post not found"})
    }
    return res.status(200).json({message: "Blog Post Updated Successfully"})
}

// Get a blog post by ID
export const getBlogPostById = async (req, res, next) => {
    const blogId = req.params.id;
    let existingBlog;
    try{
        existingBlog = await BlogPost.findById(blogId)
    }
    catch(error){
        return next(error.message || error)
    }

    if (!existingBlog){
        return res.status(404).json({message: "Blog Post does not exist"})
    }

    return res.status(200).json({ data: existingBlog})
}

// Delete a blog post
export const deleteBlogPostById = async (req, res, next) => {
    const blogId = req.params.id;
    let existingBlog;
    try {
        existingBlog = await BlogPost.findByIdAndRemove(blogId).populate("user");
        await existingBlog.user.blogs.pull(existingBlog);
        await existingBlog.user.save()
    } catch (error) {
        return next(error.message || error)
    }

    if (!existingBlog){
        return res.status(404).json({message: "Blog Post not Found"})
    }
    return res.status(200).json({message: "Blog Post Deleted Successfully"})
}

export const getUserBlogsById = async (req, res, next) => {
    const userId = req.params.id;

    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")
    } catch (error) {
        return next(error.message || error)
    }
    if(!userBlogs){
        return res.status(404).json({message: "User not Found"})
    }

    return res.status(200).json({ data: userBlogs })
}