import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  unUikeActionCreator,
  likeActionCreator,
  deletePostActionCreator,
} from "../../action-reducers/action/post";
const PostItem = ({
  auth,
  post: { _id, text, name, avatar, likes, comments, user, date },
  unUikeActionCreator,
  likeActionCreator,
  deletePostActionCreator,
  showButton,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`profile/${_id}`}>
          <img className="round-img" src={avatar} alt="User Profile" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showButton && (
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => likeActionCreator(_id)}
            >
              <i className="fas fa-thumbs-up"></i>
              {likes && likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => unUikeActionCreator(_id)}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments && comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deletePostActionCreator(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showButton: true,
};
PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  unUikeActionCreator: PropTypes.func.isRequired,
  likeActionCreator: PropTypes.func.isRequired,
  deletePostActionCreator: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  unUikeActionCreator,
  likeActionCreator,
  deletePostActionCreator,
})(PostItem);
