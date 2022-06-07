import styles from "./css/Comments.module.css";

const Comments = (props) => {
  const time = new Date(props.time).toLocaleDateString("ru-RU");
  const content = props.content;

  return (
    <li className={styles.comment} key={props.id}>
      <strong>{props.title}</strong> {time}
      <a href={"#" + props.id} id={props.id} onClick={props.submit}>
        #{props.id}
      </a>
      <p>{content}</p>
    </li>
  );
};

export default Comments;
