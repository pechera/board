import styles from "./css/Thread.module.css";

import { useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import Form from "../UI/Form";
import Comments from "./Comments";
import Header from "./Header";
import LinkList from "./LinkList";
import AddRef from "../components/AddRef";

const Thread = () => {
  const [post, getPost] = useState({});
  const [comments, setComments] = useState([]);
  const [submitText, setSubmitText] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [links, setLinks] = useState([]);

  const { id } = useParams();

  const showFormHendler = () => {
    setShowForm((showForm) => !showForm);
  };

  useEffect(() => {
    async function geThreadPost() {
      try {
        const res = await axios.get("http://localhost:7000/post/" + id);
        getPost(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getComments() {
      try {
        const res = await axios.get("http://localhost:7000/comment/" + id);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getComments();
    geThreadPost();
  }, []);

  async function commentSubmit(data) {
    try {
      const res = await axios.post("http://localhost:7000/comment/" + id, data);

      if (data.content.includes(">>")) {
        const ids = AddRef(data.content, res.data.id);
        setLinks(ids);
        // ----> Comments
      }

      setComments([...comments, res.data]);
    } catch (error) {
      console.log(error);
    }
  }
  const time = new Date(post.createdAt).toLocaleDateString("ru-RU");

  const onComment = (event) => {
    setShowForm(true);
    setSubmitText(String(">>" + event.target.id));
  };

  return (
    <Fragment>
      <Header />
      <div className={styles.thread}>
        <span>
          <strong>{post.title}</strong> {time}
          <span id={post.id} onClick={onComment}>
            #{post.id}
          </span>
        </span>
        <p>{post.content}</p>
        <ul>
          {/* <LinkList id={id} total={comments} submit={onComment} /> */}
        </ul>
      </div>
      <ul className={styles.comment__list}>
        {comments.map((comment) => (
          <Comments
            id={comment.id}
            key={comment.id}
            title={comment.title}
            content={comment.content}
            time={comment.createdAt}
            post={comment.postId}
            submit={onComment}
            links={links}
          />
        ))}
      </ul>
      <div className={styles.form}>
        {showForm ? (
          <div>
            <a onClick={showFormHendler}>Закрыть форму постинга</a>
            <Form onSubmit={commentSubmit} text={submitText} />
          </div>
        ) : (
          <a onClick={showFormHendler}>Ответить в тред</a>
        )}
      </div>
    </Fragment>
  );
};

export default Thread;
