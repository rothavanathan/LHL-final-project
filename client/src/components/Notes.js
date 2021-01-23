import { useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  notesBox: {
    background: "rgb(244, 240, 234)",
    width: '100%',
    marginTop: 10
  }

}));

export default function Notes(props) {
  const classes = useStyles();
  const { existingNote, note, setNote, setIsNotChanged } = props;
  const handleNote = (event) => {
    setNote(event.target.value);
    setIsNotChanged(false);
  };

  useEffect(() => {
    setNote(existingNote);
  }, [existingNote]);

  return (
    <div>
      <TextField
        className={classes.notesBox}
        id="outlined-multiline-static"
        label="Project Notes"
        multiline
        rows={10}
        value={note}
        onChange={handleNote}
      />
    </div>
  )
}