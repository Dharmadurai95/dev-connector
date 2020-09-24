import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCommentActionCreator } from "../../action-reducers/action/post";
const CommentPostForm = ({ postId, createCommentActionCreator }) => {
  const [formData, setformData] = useState({ text: "" });
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          createCommentActionCreator(postId, formData);
          setformData({ text: " " });
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          value={formData.text}
          onChange={(e) => setformData({ text: e.target.value })}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentPostForm.propTypes = {
  createCommentActionCreator: PropTypes.func.isRequired,
};

export default connect(null, { createCommentActionCreator })(CommentPostForm);
