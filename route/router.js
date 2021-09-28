import express from "express";
import bcrypt from "bcrypt";
import { Register } from "../models/formModel.js";
import { UserPost } from "../models/UserPost.js";
import multer from "multer";
import path from "path";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Auth } from '../middleware/login_auth.js';
import util from 'util';
import fs from 'fs';
import base64 from 'base-64';
dotenv.config();
import { uploadFile, getFileStream } from '../s3.js';



const unlinkFile = util.promisify(fs.unlink)
const router = express.Router();


// creating the image extension and giving the location 
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb)
    {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '_' + uniqueSuffix)
    }
});


// Multer middleware for image-upload
const upload = multer({
    storage: storage,
});








//Practise Code Start Here

// router.get("/images/:key", (req, res) =>
// {
//     const key = req.params.key
//     const readStream = getFileStream(key)
//     readStream.pipe(res)
// });


// router.post("/images", upload.single('image'), async (req, res) =>
// {
//     const file = req.file;
//     console.log(file)
//     const result = await uploadFile(file)
//     await unlinkFile(file.path)
//     console.log(result)
//     const desc = req.body.desc;
//     res.send({ imagepath: `/images/${result.Key}` })
// });

// router.get("/", async (req, res) =>
// {
//     return res.send("NODE STARTED");
// });

//Practise Code End Here




//Routing starts here
//To Get All User 
router.get("/u", async (req, res) =>
{
    await Register.find()
        .then((re) => res.send(re))
        .catch(() => res.send("Not Fetch"))
});


//To get All Post 
router.get("/posts", async (req, res) =>
{
    await UserPost.find()
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})


//For Login
router.post("/sign-in", async (req, res) =>
{

    try
    {

        const { email, password } = req.body;
        if (!email || !password) return res.status(402).json({ message: "All Feild are Required" });
        console.log(email, password)
        const check = await Register.findOne({ email });

        if (!check) return res.status(400).json({ message: "User not Present" });

        if (check)
        {
            // console.log(password, check.password)
            const isMatch = await bcrypt.compare(password, check.password);
            if (!isMatch)
            {
                return res.status(400).json({ message: "Invalid Credentials" });
            } else if (isMatch)
            {
                const token = jwt.sign({ _id: check._id, }, process.env.JWT_Secret_Token);
                console.log(token)
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 90000),
                    httpOnly: true
                });
                return res.status(200).json({ check, message: "Login Successfully", token });
            }
        }
    } catch (error)
    {
        console.log(error.message);
        return res.status(400).json({ message: error.message })
    }

});


//For Register
router.post("/sign-up", async (req, res) =>
{
    try
    {
        const { fullname, email, number, password } = req.body;
        console.log(fullname, email, number, password)
        if (!fullname || !email || !password) return res.status(400).json({ message: "All Field is Required" });

        const userEmail = await Register.findOne({ email });
        if (userEmail) return res.status(400).json({ message: "User Already Exist with this email try another" });

        if (!userEmail)
        {
            bcrypt.hash(password, 12)
                .then(hashpassword =>
                {
                    const user = new Register({
                        fullname,
                        email,
                        number,
                        password: hashpassword,
                    });
                    user.save();
                    console.log("Register Success");
                    return res.status(200).json({ message: "Register Success" });
                })
                .catch((error) => console.log(error.message));
        }

    } catch (error)
    {

    }
});

//For Uploading the Image
router.post("/uploadpost", upload.single('image'), async (req, res) =>
{
    const files = req.file;

    var encodeImg = []
    try
    {
        if (!files) return res.status(400).json({ message: "Please Select a Photo" });

        let img = fs.readFileSync(req.file.path)
        encodeImg = img.toString('base64')

        let userpost = new UserPost({
            filename: files.originalname,
            contentType: files.mimetype,
            // image: files.filename,
            image: encodeImg,
            imagemsg: req.body.imagemsg
        })

        // await unlinkFile(file.path)
        await userpost.save();
        // return res.send(userpost)
        return res.status(200).json({ message: "Image Uploaded Successfully" });

        // res.send({
        //     success: 1,
        //     profileUrl: `http://localhost:5000/profile/${req.file.filename}`
        // })
        // console.log(`http://localhost:5000/profile/${req.file.filename}`)

    } catch (error)
    {
        return res.status(400).json({ message: "Something went Wrong" });

    }
})





export default router
