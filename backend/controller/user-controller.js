import User from "../model/User";
import bcrypt from "bcryptjs"

// Get all users
export const getAllUsers = async (req, res, next) => {
    let users;

    try{
        users = await User.find();
    }
    catch(err){
        console.error(err.message);
    }

    if(!users){
        return res.status(404).json({message: "No users found"});
    }

    return res.status(200).json({data: users});

}

// Sign Up route
export const signUp = async (req, res, next) => {
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }
    catch(err){
        return console.log(err.message);
    }

    if (!existingUser){
        const hashedPassword = bcrypt.hashSync(password)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            blogs: []
        })

        try{
            await user.save()
        } catch(err){
            return console.log(err.message)
        }
        return res.status(201).json({message: "Sign Up Successful"})
    }

    return res.status(400).json({message: "User with that email already exists"})
}

// Login
export const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch(err){
        return console.log(err.message);
    }
    if(!existingUser){
        return res.status(404).json({message: "No user with such email"})
    }

    const correctPassword = bcrypt.compareSync(password, existingUser.password)
    if (!correctPassword){
        return res.status(400).json({message: "Incorrect Password"})
    }

    return res.status(200).json({message: "Login Successful"})
}