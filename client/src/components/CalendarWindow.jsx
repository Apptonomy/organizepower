import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Button, Dialog, Divider, AppBar, Toolbar, IconButton,
  Typography, Slide, Grid,
} from '@material-ui/core';
import Calendar from './Calendar.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#718582',
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
  user,
  events,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View Events
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Movement Events
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="space-evenly">
          {/* Calendar Component */}
          <Calendar events={events} user={user} />
        </Grid>
      </Dialog>
    </div>
  );
};

export default FullScreenDialog;
