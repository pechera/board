import styles from "./css/LinkList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function LinkList({ id, total, submit }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function getLinks() {
      try {
        const res = await axios.get("http://localhost:7000/comment/" + id);

        setLinks(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) getLinks();
  }, [total]);

  return (
    <ul className={styles.link__list}>
      {links.length > 0 ? <span>Ответы:</span> : ""}
      {links.map((link) => (
        <li key={link.id}>
          <a href={"#" + link.id} onClick={submit} id={link.id}>
            {">>" + link.id}
          </a>
        </li>
      ))}
    </ul>
  );
}
export default LinkList;
