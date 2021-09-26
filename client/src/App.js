import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Signin, Signup } from './componends/forms.js';
import { Home, Image } from './componends/Home.js';
import MediaControlCard from './componends/ProfilePage';
import Navbar from './componends/Navbar';
// import UploadPost from './componends/UploadPost';


function App()
{
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Signin} />
          <Route exact path="/sign-in" component={Signin} />
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/images" component={Image} />
          <Route exact path="/profile" component={MediaControlCard} />
          {/* <Route exact path="/uploadpost" component={UploadPost} /> */}
          {/* <Route exact path="/resetpassword" component={ForgetPassword} />
          <Route exact path="/reset/:token" component={ResetPassword} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
