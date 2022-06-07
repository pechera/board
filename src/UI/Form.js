import { useEffect } from "react";
import { createRef } from "react";

import styles from "./Form.module.css";

const Form = (props) => {
  const title = createRef();
  const content = createRef();

  useEffect(() => {
    if (props.text) content.current.value += props.text + "\n";
  }, [props.text]);

  const onSubmit = (event) => {
    event.preventDefault();

    // post/comment

    const data = {
      title: title.current.value,
      content: content.current.value,
    };
    props.onSubmit(data);

    title.current.value = "";
    content.current.value = "";
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input type="text" name="title" placeholder="Тема" ref={title} />
      <textarea
        name="content"
        placeholder="Введите ваше сообщение"
        ref={content}
      />
      {/* <input type="file" name="image" accept="image/*" /> */}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;
