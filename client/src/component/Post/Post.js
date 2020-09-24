import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSinglePostActionCreator } from "../../action-reducers/action/post";
import PostItem from ".././posts/PostItem";
import Spinner from "../../spinner/spinner";
import CommentPostForm from "./CommentPostForm";
import CommentItem from "./CommentItem";

const Post = ({
  getSinglePostActionCreator,
  post: { post, loading },
  match,
}) => {
  useEffect(() => {
    getSinglePostActionCreator(match.params.id);
  }, [getSinglePostActionCreator(match.params.id)]);
  return (
    <>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/posts" className="btn btn-primary">
            Back To Posts
          </Link>
          <PostItem showButton={false} post={post} />
          <CommentPostForm postId={post._id} />
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={comment._id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

Post.propTypes = {
  getSinglePostActionCreator: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProsp = (state) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProsp, { getSinglePostActionCreator })(Post);
