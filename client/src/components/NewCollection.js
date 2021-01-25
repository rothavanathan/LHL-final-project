import { useState } from "react";
import { Card, CardContent, CardMedia, Grid, Input, Button, ButtonGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "all .25s linear",
    background: "var(--white)",
    backgroundColor: `url("https://www.transparenttextures.com/patterns/otis-redding.png")`,
    boxShadow: "0px 2px 2px 0px rgba(244, 240, 234, 0.4)",
    opacity: 0.9,
    '&:hover': {
      boxShadow: "2px 3px 4px 2px rgba(244, 240, 234, 0.5)",
      opacity: 1.0,

    }
  },
  cardMedia: {
    paddingTop: '56.25%',
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1,
    color: "black",
    fontSize: ".6rem",
    background: "rgb(244, 240, 234)",
    alignItems: "center"
  },
  cardText: {
    fontSize: ".75rem"
  },
  saveIcon: {
    '&:hover': {
      color: "var(--primary-color)"
    }
  },
  cancelIcon: {
    marginTop: 4,
    '&:hover': {
      color: "var(--primary-color)"
    }
  },
  error: {
    color: "red"
  }
}));

export default function NewCollectionForm(props) {
  const classes = useStyles();
  const { user, setCollections, closeForm } = props;
  const [collectionName, setCollectionName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

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
    if (collectionName.length > 0) {
      setErrorMessage(false)
      saveCollection();
    } else {
      setErrorMessage(true)
    }
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
            <Input
              value={collectionName}
              onChange={handleCollection}
              type="text"
              name="project_name"
              placeholder="Collection Name"
            ></Input>
            <ButtonGroup>
              <Button className={classes.saveIcon} variant="float" color="primary" type="submit">Save</Button>

              <CancelIcon className={classes.cancelIcon} onClick={() => closeForm(false)}></CancelIcon>

            </ButtonGroup>
          </form>
          {errorMessage && <Typography variant="subtitle2" className={classes.error}>Please enter a name</Typography>}
        </CardContent>
      </Card>
    </Grid>
  )
}