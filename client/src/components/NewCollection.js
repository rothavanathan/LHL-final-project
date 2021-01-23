import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "all .25s linear",
    background: "rgb(244, 240, 234)",
    boxShadow: "0px 2px 2px 0px rgb(244, 240, 234)",
    '&:hover': {
      boxShadow: "-1px 10px 29px 0px rgb(244, 240, 234)"
    },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1,
    color: "black",
    fontSize: ".6rem",
    background: "rgb(244, 240, 234)"
  },
  cardText: {
    fontSize: ".75rem"
  }
}));

export default function NewCollectionForm(props) {
  const classes = useStyles();
  const { user, setCollections, closeForm } = props;
  // const { setUser, isLoggedIn } = props;
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState("");

  const saveCollection = () => {
    axios
      .put("http://localhost:8000/api/collection/", {
        name: collectionName,
        user_id: user
      })
      .then((res) => {
        setCollections(prev => {
          return [res.data.data, ...prev]
        })
        closeForm(false)
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    saveCollection();
  };

  const handleCollection = (event) => {
    setCollectionName(event.target.value);
  };

  return (
    <Grid item key={1} xs={6} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={"https://images.unsplash.com/photo-1524779709304-40b5a3560c60?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1269&q=80"}
          style={useStyles.media}
        />
        <CardContent className={classes.cardContent}>
          <form onSubmit={handleSubmit}>
            <input
              value={collectionName}
              onChange={handleCollection}
              type="text"
              name="project_name"
              placeholder="Enter Collection Name"
            ></input>
            <div>
              <button type="submit">Save</button>
              <CancelIcon onClick={() => closeForm(false)}></CancelIcon>
            </div>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}