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
dotenv.config();
import { uploadFile, getFileStream } from '../s3.js';



const unlinkFile = util.promisify(fs.unlink)
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploadsfol/images',
    filename: function (req, file, cb)
    {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '_' + uniqueSuffix)
    }
});


const upload = multer({
    storage: storage,
});

// router.get("/home", Auth, (req, res) =>
// {
//     console.log("Welcome to Home Page")
//     // res.send(req.rootUser)
// })

// router.get('/profile', express.static('uploadsfol/images'));
router.post("/uploadpost", upload.single('image'), async (req, res) =>
{
    // console.log(req.body)
    console.log(req.file.filename)
    try
    {
        let userpost = new UserPost({
            image: req.file.filename,
            imagemsg: req.body.imagemsg
        });

        // await unlinkFile(file.path)
        await userpost.save();
        return res.status(200).json({ message: "Uploaded" })

        // res.send({
        //     success: 1,
        //     profileUrl: `http://localhost:5000/profile/${req.file.filename}`
        // })
        // console.log(`http://localhost:5000/profile/${req.file.filename}`)

    } catch (error)
    {
        res.status(400).json({ message: "Not uploaded" });

    }
});







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

router.get("/u", async (req, res) =>
{
    await Register.find()
        .then((re) => res.send(re))
        .catch(() => res.send("Not Fetch"))
});

router.get("/posts", async (req, res) =>
{
    await UserPost.find()
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

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
                })
                return res.status(200).json({ check, message: "Login Successfully", token });
            }
        }
    } catch (error)
    {
        console.log(error.message);
    }

});

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




export default router;
