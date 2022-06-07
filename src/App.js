import React, { Fragment } from "react";
import Footer from "./components/Footer";

import Header from "./components/Header";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <PostForm />
        <PostList />
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
