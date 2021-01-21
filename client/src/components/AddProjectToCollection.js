import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {InputLabel, FormHelperText, FormControl, NativeSelect} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "#ffffff",
    background: "white"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddProjectToCollection(props) {
  const { collections, setCollectionId, collectionId } = props
  const classes = useStyles();

  const handleChange = (event) => {
    setCollectionId(event.target.value)
  };

  return (

    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-helper">Collections</InputLabel>
      <NativeSelect
        // value={state.age}
        onChange={handleChange}
        inputProps={{
          name: 'Add to Collection'
        }}
      >
        <option aria-label="None" value="" />
        {collections.map((collection, i) => {
          return <option key ={i} value={collection.id}>{collection.name}</option>
        })}

      </NativeSelect>
      <FormHelperText>Choose a Collection</FormHelperText>
    </FormControl>
  )

}