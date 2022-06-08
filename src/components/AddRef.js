import axios from "axios";

const AddRef = (content, id) => {
  const regexp = />>([0-9]*)/gm;
  let ids = content.match(regexp);

  ids = ids.map((id) => id.replace(">>", ""));

  async function sendRef() {
    try {
      await axios.post("http://localhost:7000/comment/ref/" + id, {
        ids,
      });
    } catch (error) {
      console.log("error");
    }
  }

  sendRef();

  return ids;
};
export default AddRef;
