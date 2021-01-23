import React, { useState, Fragment } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NewCollectionForm from './NewCollection';

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
    flexGrow: 1,
    backgroundColor: "var(--white)",
  },
  cardContent: {
    flexGrow: 1,
    color: "black",
    fontSize: ".6rem"
  },
  cardText: {
    fontSize: ".75rem"
  }
}));

export default function NewCollectionCard(props) {
  const { setCollections, isLoggedIn } = props;
  const [isCollectionFormOpen, setIsCollectionFormOpen] = useState(false)

  const openCollectionForm = () => {
    setIsCollectionFormOpen(true)
  }

  const closeCollectionForm = () => {
    setIsCollectionFormOpen(false)
  }

  const classes = useStyles();
  return (
    <Fragment>
      { isCollectionFormOpen ? (
        <NewCollectionForm closeForm={closeCollectionForm} user={isLoggedIn} setCollections={setCollections} />
      ) : (
      <Grid item key={props.key} xs={6} sm={6} md={4}>
        <Card className={classes.card} onClick={openCollectionForm}>
          <CardMedia
            className={classes.cardMedia}
            image={props.image}
            title={props.title}
            style={useStyles.media}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="subtitle-1" component="h2">
              {props.title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )}
    </Fragment>
  )
}
