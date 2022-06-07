import Post from "./Post";
import axios from "axios";

import styles from "./css/PostList.module.css";
import React, { Fragment, useEffect, useState } from "react";
import Search from "./Search";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await axios.get("http://localhost:7000/post");
        setPosts(res.data);
      } catch (error) {
        console.log("error");
      }
    }

    getPosts();
  }, []);

  const searchHandler = (string) => {
    setPosts(string);
  };

  return (
    <Fragment>
      <Search search={searchHandler} />
      {posts.length > 0 ? (
        <section className={styles.list}>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <hr />
                <Post
                  id={post.id}
                  time={post.createdAt}
                  title={post.title}
                  content={post.content}
                  total={post.totalCom}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p>Нет постов!</p>
      )}
    </Fragment>
  );
};

export default PostList;
