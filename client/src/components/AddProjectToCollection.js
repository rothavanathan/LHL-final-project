import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, NativeSelect } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '80%',
    color: "#ffffff",
    background: "rgb(244, 240, 234)"
  },
  selectEmpty: {
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
      {/* <InputLabel htmlFor="Save-Project-To-Collection">Save project to collection</InputLabel> */}
      <NativeSelect
        id="Save-Project-To-Collection"
        aria-label="Save-Prooject-To-Collection"
        value={collectionId}
        onChange={handleChange}
        inputProps={{
          name: 'Add to Collection'
        }}
      >
        <option aria-label="No Collection" value="">-- No Collection --</option>
        {collections.map((collection, i) => {
          return <option key={i} value={collection.id}>{collection.name}</option>
        })}

      </NativeSelect>
    </FormControl>
  )

}