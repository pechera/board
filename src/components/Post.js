import React, { Fragment, useEffect, useState } from "react";
import styles from "./css/Post.module.css";
import Comments from "./Comments";
import axios from "axios";
import LinkList from "./LinkList";

const Post = (props) => {
  const [comments, setComments] = useState([]);

  const time = new Date(props.time).toLocaleDateString("ru-RU");

  useEffect(() => {
    if (props.total > 0) {
      async function getComments() {
        try {
          const res = await axios.get(
            "http://localhost:7000/comment/" + props.id
          );

          let result = [...res.data];

          if (props.total >= 2) {
            result = result.splice(-2);
          } else {
            result.splice(props.total);
          }

          setComments(result);
        } catch (error) {
          console.log(error);
        }
      }

      getComments();
    }
  }, []);

  return (
    <Fragment>
      <div className={styles.post}>
        <span>
          <strong>{props.title}</strong> {time} #{props.id}
          <a className={styles.post__link} href={"/thread/" + props.id}>
            Ответ
          </a>
        </span>
        <p>{props.content}</p>
        <LinkList id={props.id} />
      </div>

      <ul>
        {comments.length > 0
          ? comments.map((comment) => (
              <Comments
                id={comment.id}
                key={comment.id}
                title={comment.title}
                content={comment.content}
                time={comment.createdAt}
                post={comment.postId}
              />
            ))
          : ""}
      </ul>
    </Fragment>
  );
};

export default Post;
