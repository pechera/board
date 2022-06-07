import React, { useState } from "react";
import styles from "./css/PostForm.module.css";
import UIForm from "../UI/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostForm = () => {
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  async function postSubmit(data) {
    try {
      const res = await axios.post("http://localhost:7000/post", data);

      navigate("/thread/" + res.data.id);
    } catch (error) {}
  }

  const showFormHendler = () => {
    setShowForm((showForm) => !showForm);
  };

  return (
    <section className={styles.postform}>
      {showForm ? (
        <div className={styles.form__wrapper}>
          <div>
            <a onClick={showFormHendler}>Закрыть форму постинга</a>
          </div>
          <UIForm onSubmit={postSubmit} />
        </div>
      ) : (
        <a onClick={showFormHendler}>Создать тред</a>
      )}
    </section>
  );
};

export default PostForm;
