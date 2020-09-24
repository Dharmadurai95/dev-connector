import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCommentActionCreator } from "../../action-reducers/action/post";
// import Moment from "react-moment";
const CommentItem = ({
  postId,
  comment: { avatar, _id, text, name, user, date },
  auth,
  deleteCommentActionCreator,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on 04/16/2019</p>
      {!auth.loading && user === auth.user._id && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteCommentActionCreator(postId, _id)}
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  deleteCommentActionCreator: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { deleteCommentActionCreator })(
  CommentItem
);
