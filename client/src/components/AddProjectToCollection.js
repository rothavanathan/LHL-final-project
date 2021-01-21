import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {

    width: '80%',
    color: "#ffffff",
    background: "rgb(244, 240, 234)"
  },
  selectEmpty: {
    // marginTop: theme.spacing(1),
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
      <InputLabel htmlFor="age-native-helper">Save to Collection</InputLabel>
      <NativeSelect
        // value={state.age}
        onChange={handleChange}
        inputProps={{
          name: 'Add to Collection'
        }}
      >
        <option aria-label="No Collection" value="">--</option>
        {collections.map(collection => {
          return <option value={collection.id}>{collection.name}</option>
        })}

      </NativeSelect>
    </FormControl>
  )

}