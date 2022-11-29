import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

export default function Form({ currentPostId, setCurrentPostId }) {
  const styles = useStyles();

  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentPostId
      ? state.posts.find((post) => post._id === currentPostId)
      : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  function handleSubmit(event) {
    event.preventDefault();

    if (currentPostId)
      dispatch(
        updatePost(currentPostId, { ...postData, name: user.result.name })
      );
    else dispatch(createPost({ ...postData, name: user.result.name }));
    clear();
  }

  function clear(event) {
    setCurrentPostId(null);
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  }


  // if(!user?.result?.name){
  if(!user){
    return(
      <Paper className={styles.paper}>
        <Typography variant="h6" align="center">
          Sign-in to create posts and like other's posts
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={styles.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${styles.root} ${styles.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {(currentPostId ? "Editing" : "Creating") + " a Memory"}
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(event) =>
            setPostData({ ...postData, creator: event.target.value })
          }
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(event) =>
            setPostData({ ...postData, title: event.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(event) =>
            setPostData({ ...postData, message: event.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData({ ...postData, tags: event.target.value.split(",") })
          }
        />
        <div className={styles.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={`${styles.buttonSubmit} ${styles.button}`}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className={styles.button}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
