import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { deletePost, updatePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import { ThumbUpAltOutlined } from "@material-ui/icons";

export default function Post({ post, setCurrentPostId }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  function handleDelete(event) {
    dispatch(deletePost(post._id));
  }

  function handleLike(event) {
    dispatch(updatePost(post._id, { ...post, likeCount: post.likeCount + 1 }));
  }

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      let userHasLiked = post.likes.find((id) => {
        return id === (user?.result?._id || user?.result?.googleID);
        // else return false;
      });
      return userHasLiked ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
          &nbsp;
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;
          {`${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
          &nbsp;
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={styles.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(post.creator === user?.result?._id ||
        post.creator === user?.result?.googleID) && (
        <div className={styles.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentPostId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className={styles.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={styles.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={styles.CardActions}>
        <Button
          size="small"
          disabled={!user}
          color="primary"
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(post.creator === user?.result?._id ||
          post.creator === user?.result?.googleID) && (
          <Button size="small" color="primary" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
