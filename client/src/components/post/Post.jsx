import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//components
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

//redux
import { getPost } from "../../store/post-actions";

const Post = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn btn-primary">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={id} />
        ))}
      </div>
    </section>
  );
};

export default Post;
