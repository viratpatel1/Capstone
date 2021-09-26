import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import Navbar from './Navbar';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Home.css';



const url = "http://localhost:5000/";


const ExpandMore = styled((props) =>
{
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const Home = () =>
{
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory()
    const [post, setPost] = useState([]);


    const handleExpandClick = () =>
    {
        setExpanded(!expanded);
    };

    const token = localStorage.getItem('jwtoken');

    // console.log("8", token)

    useEffect(() =>
    {
        fetch(`${url}posts`)
            .then((result) => result.json())
            .then(result => setPost(result))
    }, [])


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

    return (
        <div>

            {post.map((data) =>
            {
                const { image, imagemsg } = data;
                return (
                    <>
                        <Card className="card" sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={imagemsg}
                                subheader={Date()}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={`../../../uploadsfol/image${image}`}
                                alt="Post"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {imagemsg}

                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                        </Card>
                    </>
                );
            }
            )}

        </div>
    )
}
// <Card className="card" sx={{ maxWidth: 345 }}>
//     <CardHeader
//         avatar={
//             <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                 R
//             </Avatar>
//         }
//         action={
//             <IconButton aria-label="settings">
//                 <MoreVertIcon />
//             </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//     />
//     <CardMedia
//         component="img"
//         height="194"
//         image="image/SM.png"
//         alt="Paella dish"
//     />
//     <CardContent>
//         <Typography variant="body2" color="text.secondary">
//             This impressive paella is a perfect party dish and a fun meal to cook

//         </Typography>
//     </CardContent>
//     <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//             <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//             <ShareIcon />
//         </IconButton>
//         <ExpandMore
//             expand={expanded}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//         >
//             <ExpandMoreIcon />
//         </ExpandMore>
//     </CardActions>
//     {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//             <Typography paragraph>Method:</Typography>
//             <Typography paragraph>
//                 Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
//                 aside for 10 minutes.
//             </Typography>
//             <Typography paragraph>
//                 Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
//                 medium-high heat stirring
//                 occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
//                 large plate.
//             </Typography>
//             <Typography paragraph>
//                 Add rice and stir very gently to distribute. Top with artichokes and
//                 peppers, and cook wit
//                 minutes more. (Discard any mussels that don’t open.)
//             </Typography>
//             <Typography>
//                 Set aside off of the heat to let rest for 10 minutes, and then serve.
//             </Typography>
//         </CardContent>
//     </Collapse> */}
// </Card>

export const Image = () =>
{
    const [image, setImage] = useState();
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
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label>Yr message</label>
                <input type="text" name="imagemsg" onChange={(e) => setImageMsg(e.target.value)} ></input>
                <label>Select Image</label>
                <input type="file" name="image" onChange={handleChange} ></input>
                <button onSubmit={onSubmit} >Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
};

export default { Home, Image }





