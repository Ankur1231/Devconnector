import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//redux
import { deleteComment } from "../../store/post-actions";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            className="btn btn-danger"
            type="button"
            onClick={(e) => dispatch(deleteComment(postId, _id))}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
