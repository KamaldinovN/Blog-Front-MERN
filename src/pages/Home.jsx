import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components";
import { TagsBlock } from "../components";
import { CommentsBlock } from "../components";
import { fetchPosts, fetchPopularPosts, fetchNewPosts, fetchTags } from "../redux/Slice/post";

export const Home = () => {
    const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
     setValue(newValue);
        if(newValue === 1){
            dispatch(fetchNewPosts())
        }
        if(newValue === 2){
            dispatch(fetchPopularPosts())
        }

    }

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
   //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
      >
      <Tab label="All"/>
        <Tab  label="New"  />
        <Tab label="Popular"/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `https://mernblog-qnjk.onrender.com${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt.replace(/T|\.[\s\S]*/g, ' ').trim()}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user?._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            key={indexedDB}
            isLoading={isTagsLoading}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Jane Kane",
                  avatarUrl:
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
                },
                text: "Test comment",
              },
              {
                user: {
                  fullName: "Van Gok",
                  avatarUrl:
                    "https://images.unsplash.com/photo-1629467057571-42d22d8f0cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
