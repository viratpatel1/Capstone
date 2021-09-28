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



const url = "https://captone-project.herokuapp.com/";


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
                const { filename, contentType, image, imagemsg } = data;
                return (
                    <>
                        <Card className="card" sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

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
                                className="img-box"
                                component="img"
                                height="380"
                                // src={`data:image/jpeg;base64,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I+uk8+omfrllItc8WaP1QBt/tYCQA34X1BFfEbAW45lx4lc4CJskgDbepwY6179N+iqTw4lazNdN5nHmu+5jfb87L0HKwSxlrxcEEEfIrzLi+FOwjF5qSp20OIB7t5afq0goncp34j4vTVGIuZl9zp53tcyWOFuttiADqIuD8LbtG4dGxwtZwNdVMGqdkk7Lh8ZvcEXt1Hfi4I+a9C5HFG/L0b8AjZGwgAhoAcHDZwdbcuB2N1Wma8ref4mtpQ/y4qhvmRm2oMNn62gXFhqaT8taId3gvI12YpPNsXmCzD2a1wvydybi5/0jsp14oUIrcmTahvHpkae2ki/8pcPqouPDCrwqsbJl6vLXC9tcYsNuBYnY9diurOVdjGGYEYcdNI+OU+WZI9QfaxJGk2HA5AQQjIdcaLNlM4HmVrD7P9J/8ivSC84ZHw81uYabT/1Ef8nrP5NXo9AREQEREBERAREQEREBERAREQEREBERAREQEREBERAXTLTMm/xGgruRBgnD9B/u73N+XIXzVPD8QDx8tis9EGv/ALWYx1qgFh+YUN8ScqjMlMKnBtLqiMWLQReRgudP7wuSPcjqFYEjBI2zwCPmFqK3LUFSbx6o3ftRuLf9kFD5XzXUZXrS6k3BNpIn3DXkbe7Hi1r/AEIKlGZc9UuJ4nh9XA2RktPN+Ixzd/KePUQ5uzraRtz6uFt81eGM2JSGSkma+Tu8aXO/eLdne5F/mq6xbKWIYNf9NppNI/WZ62/yoLexDxQoaST8FxmBZdvlg31X3adYAbsQb36O+V6qzZmmbNGIa5/S0XDGDcMB/q49T8lhYHl6fHZdNCG7c63tZb6ON/sFZ+VvCtlHIJMeeJCNxGy+j+Ind3sLD3QffCTLxgpxU1Qts4RX66ran+1gGj+LurLXFjAxgDAABsAOAFyQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREGDVYRBVm88TCe9rH7jdcqegFLtTucB2JuPzWYiD4ON19REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf//Z`}
                                src={`data:${contentType};base64,${image}`}
                                alt={"image "}
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
