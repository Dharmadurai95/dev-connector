import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postActionCreator } from "../../action-reducers/action/post";
import Spinner from "../../spinner/spinner";
import PostItem from "./PostItem";
import PostCreate from "./PostCreate";
import { v4 as uuidv4 } from "uuid";

const Posts = ({ postActionCreator, post: { posts, loading } }) => {
  useEffect(() => {
    postActionCreator();
  }, [postActionCreator]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
          </p>
          <PostCreate />
          {/*     post form */}
          <div className="posts">
            {posts.map((post) => {
              return <PostItem key={uuidv4()} post={post} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

Posts.propTypes = {
  postActionCreator: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps, { postActionCreator })(Posts);
