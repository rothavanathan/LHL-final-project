import React, { useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function LoginError(props) {

  const { open, handleErrorClosed, handleCancelDelete } = props;

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete {props.name}
      </Button> */}
      <Dialog
        open={open}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ERROR"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Looks like {props.emailError || props.passError}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}