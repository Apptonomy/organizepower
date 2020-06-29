import React, { useState } from 'react';
import axios from 'axios';

// Imports to create dialogs using material-ui and provide page transition functionality
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, FormControl,
  FormControlLabel, InputLabel, TextField, Select,
  Switch, MenuItem, Divider, IconButton, Typography, Grid,
  Popover,
} from '@material-ui/core';
import {
  Timeline, TimelineItem, TimelineConnector, TimelineDot,
  TimelineSeparator, TimelineContent,
} from '@material-ui/lab';

// Material ui to style the components added from the plain material ui package
const useStyles = makeStyles((theme) => ({
  dialog: {
    minHeight: '90vh',
    maxHeight: '90vh',
    marginTop: '90px',
  },
  appBar: {
    backgroundColor: '#718582',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const EventCard = ({
  event,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [anchorElType, setAnchorElType] = useState(null);
  const [anchorElDetails, setAnchorElDetails] = useState(null);
  const [anchorElWhen, setAnchorElWhen] = useState(null);
  const [anchorElWhere, setAnchorElWhere] = useState(null);

  const typePOOpen = Boolean(anchorElType);
  const detailsPOOpen = Boolean(anchorElDetails);
  const whenPOOpen = Boolean(anchorElWhen);
  const wherePOOpen = Boolean(anchorElWhere);

  const typeId = typePOOpen ? 'simple-popover' : undefined;
  const detailsId = detailsPOOpen ? 'simple-popover' : undefined;
  const whenId = whenPOOpen ? 'simple-popover' : undefined;
  const whereId = wherePOOpen ? 'simple-popover' : undefined;

  // open for the event card window
  const handleClickOpen = () => {
    console.log(event);
    setOpen(true);
  };
  // close for the event card window
  const handleClose = () => {
    setOpen(false);
  };

  // click for the single popover
  const handleClick = (eventHere) => {
    const val = eventHere.currentTarget.value;
    if (val === 'Type') {
      setAnchorElType(eventHere.currentTarget);
    } else if (val === 'Details') {
      setAnchorElDetails(eventHere.currentTarget);
    } else if (val === 'When') {
      setAnchorElWhen(eventHere.currentTarget);
    } else if (val === 'Where') {
      setAnchorElWhere(eventHere.currentTarget);
    }
  };
  // close for the single popover
  const handleClosePopover = () => {
    setAnchorElType(null);
    setAnchorElDetails(null);
    setAnchorElWhen(null);
    setAnchorElWhere(null);
  };

  const handleRsvp = () => {
    const { eventId, userId } = event.other;
    axios.post(`/event/rsvp/${eventId}/${userId}`)
      .then(() => {
        console.log('successfully rsvped!');
        console.log(event.other.rsvpCount);
      })
      .catch((err) => {
        console.error('Error successfully rsvping:', err);
      });
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Details...
      </Button>
      <Dialog
        fullWidth={fullWidth}
        className={classes.dialog}
        maxWidth="md"
        scroll="paper"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        {event && (
          <div>
            <DialogTitle id="max-width-dialog-title">
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h3" className={classes.title}>
                {event.title}
              </Typography>
            </DialogTitle>

            <Divider variant="middle" /><br />

            {/* For the left side popovers */}
            {/* description */}
            <Popover
              id={detailsId}
              open={detailsPOOpen}
              value="Details"
              anchorEl={anchorElDetails}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography variant="h5" className={classes.typography}>{event.desc}</Typography>
            </Popover>

            {/* where */}
            <Popover
              id={whereId}
              open={wherePOOpen}
              value="Where"
              anchorEl={anchorElWhere}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography variant="h5" className={classes.typography}>{event.other.location}</Typography>
            </Popover>

            {/* For the right side popovers */}
            {/* category */}
            <Popover
              id={typeId}
              open={typePOOpen}
              value="Type"
              anchorEl={anchorElType}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography variant="h5" className={classes.typography}>{event.other.category}</Typography>
            </Popover>

            {/* when */}
            <Popover
              id={whenId}
              open={whenPOOpen}
              value="When"
              anchorEl={anchorElWhen}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography variant="h5" className={classes.typography}>{event.other.time}</Typography>
            </Popover>

            <Timeline align="alternate">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><Button aria-describedby={typeId} value="Type" onClick={handleClick}>Type</Button></TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><Button aria-describedby={detailsId} value="Details" onClick={handleClick}>Details</Button></TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><Button aria-describedby={whenId} value="When" onClick={handleClick}>When</Button></TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent><Button aria-describedby={whereId} value="Where" onClick={handleClick}>Where</Button></TimelineContent>
              </TimelineItem>
            </Timeline><br />

            {/* <Typography variant="h5" className={classes.title}>
              ATTENDING:
              <Typography variant="h4" className={classes.title}>
                {event.other.rsvpCount}
              </Typography>
            </Typography> */}
            <DialogActions>
              <Button size="large" variant="outlined" color="primary" onClick={handleRsvp}>
                RSVP
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default EventCard;
