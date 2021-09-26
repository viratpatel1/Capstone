import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import UploadPost from './UploadPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from './Home';
import '../CSS/ProfilePage.css';

const url = "http://localhost:5000/";


export default function MediaControlCard()
{
    const theme = useTheme();
    const [image, setImage] = useState();
    const [name, setName] = useState([]);
    const [imagemsg, setImageMsg] = useState()




    const handleChange = (e) =>
    {
        setImage(e.target.files[0])
    }

    const onSubmit = (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("imagemsg", imagemsg)

        const congir = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(`${url}uploadpost`, formData, congir)
            .then((re) => toast(re.data.message))
            .catch((err) => toast(err.response.data.message));

    }

    useEffect(() =>
    {
        fetch(`${url}u`)
            .then((result) => result.json())
            .then(result => setName(result))
    }, [])

    return (
        <div>
            {/* {name.map((data) =>
            {
                const { fullname } = data;
                return (
                    <>
                        <Card className="card" sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {fullname}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                    </IconButton>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="image/SM.png"
                                alt="Live from space album cover"
                            />
                        </Card>

                    </>
                )
            })
            } */}
            <Card className="card" sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            User Name
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">

                        </Typography>
                    </CardContent>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                    </IconButton>
                                </Box> */}
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image=""
                    alt="User Picture"
                />
            </Card>
            <UploadPost>
                <form onSubmit={onSubmit} >
                    <label>Yr message</label>
                    <input type="text" name="imagemsg" onChange={(e) => setImageMsg(e.target.value)} ></input>
                    <label>Select Image</label>
                    <input type="file" name="image" onChange={handleChange} ></input>
                    <button onSubmit={onSubmit} >Submit</button>
                </form>
                <ToastContainer />
            </UploadPost>
        </div >
    );
}

