import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, NoFound } from "./pages";
import axios from "./axios";

function App() {
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(`http://localhost:5000/auth/me`)
        .then((res) => console.log(res.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={`/posts/:id`} element={<FullPost />} />
          <Route path={`/posts/:id/edit`} element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
