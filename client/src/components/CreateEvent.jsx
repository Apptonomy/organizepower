import React, { useState } from 'react';
import axios from 'axios';

// Imports to create custom time and date pickers using moment as the utility library
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import lightBlue from '@material-ui/core/colors/lightBlue';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';

// Imports to create dialogs using material-ui and provide page transition functionality
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, FormControl,
  FormControlLabel, InputLabel, TextField, Select,
  Switch, MenuItem, Divider, AppBar, Toolbar,
  IconButton, Typography, Grid, Fab, ButtonGroup,
  createMuiTheme,
} from '@material-ui/core';

// Allow the calendar view to be accessible whether the user is the creator of the movement or not
import FullScreenDialog from './CalendarWindow.jsx';

// Material UI picker to style the theme for the date and time custom components
const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#718582',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: lightBlue['400'],
      },
      dayDisabled: {
        color: lightBlue['100'],
      },
      current: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue['400'],
      },
    },
  },
});

// Material ui to style the components added from the plain material ui package
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
  const [multiDay, setMultiDay] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImage] = useState('');

  const [fullWidth, setFullWidth] = useState(true);
  const [categoryText, setCategoryText] = useState('Select the type of Event you are holding');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    // toLocaleTimeString() 11:18:48 AM
    // toLocaleDateString() 11/16/2015
    console.log('selectedStartDate', selectedStartDate);
    console.log('selectedEndDate', selectedEndDate);
    console.log('time', selectedTime);
    console.log('name', name);
    console.log('description', description);
    console.log('location', location);
    console.log('category', category);
    // axios.post('/event', {
    //   name,
    //   location,
    //   time: selectedTime.toLocaleTimeString(),
    //   start_date: selectedStartDate,
    //   end_date: selectedEndDate,
    //   category,
    //   description,
    //   rsvpCount: 0,
    //   id_movement: moveId,
    //   imageUrl: '',
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
    } else if (value === 'Boycott') {
      setCategoryText('Support the cause by abstaining from using specific services.');
    } else if (value === 'Other') {
      setCategoryText('Type of Event not listed here? Give followers some extra details in the description of your event.');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup>
        <FullScreenDialog />
        {isCreator && (
          <Fab color="primary" aria-label="add" variant="extended" size="small" style={{ outline: 'none' }}>
            <AddIcon onClick={handleClickOpen} />
          </Fab>
          // <Button variant="outlined" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-red-400 rounded shadow m-4" onClick={handleClickOpen}>
          //   Schedule Event
          // </Button>
        )}
      </ButtonGroup>

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
              <ThemeProvider theme={materialTheme}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  label="Start"
                  value={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                {multiDay && (
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    format="MM/dd/yyyy"
                    label="End Date"
                    value={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                )}
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Event Time"
                  value={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  keyboardIcon={<AccessTimeIcon />}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </ThemeProvider>
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControlLabel
            className={classes.formControlLabel}
            control={<Switch checked={multiDay} onChange={() => setMultiDay(!multiDay)} />}
            color="primary"
            label="Multiple Day Event"
          />
          <Divider variant="middle" />
          <br />

          {/* Provide the select field for the event's type /category value */}
          <Grid container justify="space-evenly">
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
                  <MenuItem value="Informational Session">INFORMATIONAL SESSION</MenuItem>
                  <MenuItem value="Spread Awareness">SPREAD AWARENESS</MenuItem>
                  <MenuItem value="March">MARCH</MenuItem>
                  <MenuItem value="Sit In">SIT IN</MenuItem>
                  <MenuItem value="Boycott">BOYCOTT</MenuItem>
                  <MenuItem value="Other">OTHER</MenuItem>
                </Select>
                <DialogContentText>
                  {categoryText}
                </DialogContentText>
              </FormControl>
            </form>
            <TextField
              id="outlined-multiline-static"
              label="Event Description"
              value={description}
              multiline
              rows={4}
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
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
