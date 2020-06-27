import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Imports to create custom time and date pickers using moment as the utility library
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// Imports to create dialogs using material-ui and provide page transition functionality
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  FormControl, FormControlLabel, InputLabel, TextField, MenuItem, Select, Switch,
  Divider, AppBar, Toolbar, IconButton, Typography, Grid,
} from '@material-ui/core';

// Allow the calendar view to be accessible whether the user is the creator of the movement or not
import FullScreenDialog from './CalendarWindow.jsx';

const useStyles = makeStyles((theme) => ({
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
}));

const EventCreateDialog = ({
  user,
  moveId,
  isCreator,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImage] = useState('');

  const [fullWidth, setFullWidth] = useState(true);
  const [categoryText, setCategoryText] = useState('Select the type of Event you are holding');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    console.log('date', selectedDate);
    console.log('time', selectedTime);
    console.log('name', name);
    console.log('location', location);
    console.log('category', category);
    // axios.post('/event', {
    //   // name: DataTypes.STRING,
    //   // location: DataTypes.STRING,
    //   // category: DataTypes.STRING,
    //   // description: DataTypes.TEXT,
    //   // rsvpCount: DataTypes.INTEGER,
    //   // imageUrl: DataTypes.STRING,
    //   name,
    //   location,
    //   time: selectedTime,
    //   date: selectedDate,
    //   category,
    //   description,
    //   rsvpCount: 0,
    //   imageUrl,
    // });
    setOpen(false);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value === 'Informational Session') {
      setCategoryText('Come learn more about the cause.');
    } else if (value === 'Spread Awareness') {
      setCategoryText('Help us educate others on the cause.');
    } else if (value === 'March') {
      setCategoryText('Participate in a mobile protest.');
    } else if (value === 'Sit In') {
      setCategoryText('Participcate in a stationary protest.');
    } else if (value === 'Other') {
      setCategoryText('Type of Event not listed here? Give followers some extra details in the description of your event.');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FullScreenDialog />
      {isCreator && (
        <Button variant="outlined" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-red-400 rounded shadow m-4" onClick={handleClickOpen}>
          Schedule Event
        </Button>
      )}

      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              SCHEDULE EVENT
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogTitle id="max-width-dialog-title">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" value={name} label="Event Name" onChange={(event) => setName(event.target.value)} />
          </form>
        </DialogTitle>
        <DialogContent>
          {/* Provide the time and date custom created pickers in grid block */}
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          {/* Provide the select field for the event's type /category value */}
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Event Type</InputLabel>
              <Select
                value={category}
                onChange={(event) => {
                  handleCategoryChange(event.target.value);
                }}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
              >
                <MenuItem value="Informational Session">INFO SESSION</MenuItem>
                <MenuItem value="Spread Awareness">SPREAD AWARENESS</MenuItem>
                <MenuItem value="March">MARCH</MenuItem>
                <MenuItem value="Sit in">SIT IN</MenuItem>
                <MenuItem value="Other">OTHER</MenuItem>
              </Select>
              <DialogContentText>
                {categoryText}
              </DialogContentText>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventCreateDialog;
