import styles from "./css/Comments.module.css";
import ContentMarkup from "./ContentMarkup";
import axios from "axios";
import { useEffect, useState } from "react";

const Comments = (props) => {
  const time = new Date(props.time).toLocaleDateString("ru-RU");
  const [links, setLinks] = useState([]);

  const content = ContentMarkup(props.content);

  useEffect(() => {
    async function getRef() {
      try {
        const res = await axios.get(
          "http://localhost:7000/comment/ref/" + props.id
        );

        if (res.data.ref) {
          const str = res.data.ref.split(",");
          str.shift(); // временное решение
          setLinks(str);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getRef();
  }, [props.links]);

  return (
    <li className={styles.comment} key={props.id}>
      <strong>{props.title}</strong> {time}
      <a href={"#" + props.id} id={props.id} onClick={props.submit}>
        #{props.id}
      </a>
      <p
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {links.length ? (
        <p className={styles.links}>
          <span>Ответы:</span>
          {links.map((link) => (
            <a href={`#${link}`}>>>{link}</a>
          ))}
        </p>
      ) : (
        ""
      )}
    </li>
  );
};

export default Comments;
