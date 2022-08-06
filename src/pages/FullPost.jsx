import React from "react";
import axios from "../axios";

import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`https://frozen-escarpment-09799.herokuapp.com/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Warning to get post");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `https://blog-mern-kamaldinov.herokuapp.com/${data.imageUrl}`
            : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Vasil Arakin",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Testing comment 555555",
          },
          {
            user: {
              fullName: "Taras Tarasovish",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
