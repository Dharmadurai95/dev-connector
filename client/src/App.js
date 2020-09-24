import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";
import Landing from "./component/Landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import AlertMessage from "./component/alertMessage";
import { loaded } from "./action-reducers/action/auth";
import setAuthTokenHeader from "./action-reducers/utility/setHeader";
import DashBoard from "./dashboard/DashBoard";
import PrivateRoute from "./routing/privateRoute";
import CreateProfile from "./profile-form/CreateProfile";
import AddExperince from "./profile-form/AddExperince";
import AddEducation from "./profile-form/AddEducation";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import EditProfile from "./profile-form/EditProfile";
import Posts from "./component/posts/Posts";
import Post from "./component/Post/Post";

import store from "./store";

function App() {
  if (localStorage.token) {
    setAuthTokenHeader(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loaded());
  }, []);
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <AlertMessage />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={DashBoard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-experience" component={AddExperince} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/post/:id" component={Post} />
        </Switch>
      </section>
    </>
  );
}

export default App;
