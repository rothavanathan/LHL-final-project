import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function RegError(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ERROR"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Looks like {props.emailError ? props.emailError : props.passError}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
