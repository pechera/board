import React, { useRef } from "react";
import axios from "axios";

const Search = (props) => {
  const searchRef = useRef();

  const searchHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      const searchString = searchRef.current.value;

      async function search() {
        try {
          const res = await axios.get(
            "http://localhost:7000/feed?search=" + searchString
          );
          props.search(res.data);
        } catch (error) {
          console.log("error");
        } finally {
          searchRef.current.value = "";
        }
      }

      search();
    }
  };
  return (
    <section>
      <input
        // style={{ "margin-left": "1rem" }}
        type="text"
        placeholder="Поиск [Enter]"
        ref={searchRef}
        onKeyDown={searchHandler}
      />
    </section>
  );
};

export default Search;
