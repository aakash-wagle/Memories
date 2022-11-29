import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={styles.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentPostId={setCurrentPostId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form
              currentPostId={currentPostId}
              setCurrentPostId={setCurrentPostId}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
