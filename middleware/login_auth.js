import jwt from 'jsonwebtoken';
import { Register } from "../models/formModel.js";
import dotenv from 'dotenv';
dotenv.config();


export const Auth = async (req, res, next) =>
{
    try
    {
        const token = req.cookies.jwtoken;
        console.log("12", token)
        const verificationToken = jwt.verify(token, process.env.JWT_Secret_Token);

        const rootUser = await Register.findOne({ _id: verificationToken._id });
        console.log("16", rootUser)

        if (!rootUser)
        {
            return res.status(400).json({ message: "User not Found" });
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next()

    } catch (error)
    {
        console.log(error.message)
        return res.status(401).json({ message: "Token Not found" })
    }
};




// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import { Register } from "../models/formModel.js";
// dotenv.config();

// export const Auth = (req, res, next) =>
// {
//     const { auth } = req.headers
//     console.log(auth)
//     if (!auth)
//     {
//         return res.status(401).json({ message: "You must be Loggged In" });
//     }
//     const token = auth.replace("Bearer ", "")
//     jwt.verify(token, process.env.JWT_Secret_Token, (err, payload) =>
//     {
//         if (err)
//         {
//             return res.status(401).json({ message: "You Must be Logged In" })
//         }

//         const { _id } = payload
//         Register.findById(_id)
//             .then((userdata) =>
//             {
//                 req.user = userdata
//             })
//         next()
//     })
// }

// export default { Auth }