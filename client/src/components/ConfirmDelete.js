import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function ConfirmDelete(props) {
  const { open, handleConfirmDelete, handleCancelDelete } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {props.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
          <Button onClick={handleCancelDelete} color="primary" autoFocus>
            Take me back!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}