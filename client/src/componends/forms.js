import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { Form, Container, Nav, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory, useParams } from 'react-router-dom'
import "../CSS/form.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:5000/";

export const Signin = () =>
{
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const token = localStorage.getItem('jwtoken');


    useEffect(() =>
    {
        if ((token === "undefined") || (token === null))
        {
            history.push("/sign-in");

        } else
        {
            history.push("/home");
        }
    }, [])


    const onSubmit = handleSubmit(async (data) =>
    {
        try
        {
            const { email, password } = data;
            await axios.post(`${url}sign-in`, { email, password })
                .then((res) =>
                {
                    localStorage.setItem('jwtoken', res.data.token);
                    toast(res.data.message)
                    history.push("/home")
                })
                .catch((err) => toast(err.response.data.message));
        } catch (error)
        {
            toast(error.response.data.message)
            console.log(error.response)
        }
    });
    return (
        <div className="box">
            <h2>Login</h2>
            <Form onSubmit={onSubmit} >
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control {...register("email")} name="email" type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control {...register("password")} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <br />
                <Button onClick={onSubmit} variant="primary" type="submit">
                    Login
                </Button>
                <Link to={"/sign-up"}>Create Account</Link>
            </Form>
            {/* <Button onClick={Click} variant="primary" type="submit">
                    Login
                </Button> */}
            <ToastContainer />
        </div>

    )
};

export const Signup = () =>
{

    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit((data) =>
    {
        const { fullname, email, number, password } = data;
        axios.post(`${url}sign-up`, { fullname, email, number, password })
            .then((re) => toast(re.data.message))
            .catch((err) => toast(err.response.data.message))
    })

    return (
        <div className="box">
            <h3>Register</h3>
            {/* <img src="./insta.png" alt="insts"></img> */}
            <Form method="POST" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    {/* <Form.Label>Fullname</Form.Label> */}
                    <Form.Control {...register("fullname")} name="fullname" type="text" placeholder="Enter Fullname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control {...register("email")} name="email" type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    {/* <Form.Label>Number</Form.Label> */}
                    <Form.Control {...register("number")} name="number" type="number" placeholder="Enter number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control {...register("password")} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Link to={"/sign-in"} > Allready Have an Account</Link><br /><br />
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <ToastContainer />
        </div>
    )
};

// async function postImage({ image, desc })
// {
//     const formData = new FormData();
//     formData.append("image", image)
//     formData.append("desc", desc)

//     const result = await axios.post(`${url}images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//     return result.data
// }

// export const Image = () =>
// {
//     const [images, setImages] = useState([]);
//     const [desc, setDesc] = useState("");
//     const [file, setFile] = useState()

//     const onSubmit = async (e) =>
//     {
//         e.preventDefault();
//         console.log(images, desc)
//         const result = await postImage({ image: file, desc })
//         setImages([result.image, ...images]);
//         // .then(() => console.log("Success"))
//         // .catch(() => console.log("Failed"));
//         // console.log("result", result);


//     }

//     const fileSelected = (event) =>
//     {
//         const file = event.target.files[0]
//         setFile(file)
//     }

//     return (
//         <div >
//             <form onSubmit={onSubmit} >
//                 <label>Select Image</label>
//                 <input onChange={fileSelected} type="file" accept="input/*"></input>
//                 <label>Description</label>
//                 <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}></input>
//                 <button>Submit</button>
//             </form>

//             {images.map(image => (
//                 <div key={image}>
//                     <img src={image}></img>
//                 </div>
//             ))}
//             <img style={{ width: "60vh", height: "50vh" }} src="http://localhost:5000/images/598cb9aa8a71242fadfc6a8d1c4d962f" alt="image"></img>
//         </div>
//     )
// }




export default { Signin, Signup }