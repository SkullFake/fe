import React from 'react';

import { Grid, Button, Dialog, FormControl, InputLabel, Input, Typography, TextField, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import CloseIcon from '@material-ui/icons/Close';
import InputMask from 'react-input-mask';
import { host } from '../../../const/node-server-config';

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/uk';


const InlineDatePickerTheme = createMuiTheme({
  overrides: { 
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: 'lightsalmon',
        textTransform: 'capitalize',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        textTransform: 'capitalize'
      },
    },
    MuiPickersDay: {
      isSelected: {
        backgroundColor: 'lightsalmon',

        '&:hover': {
          backgroundColor: 'tomato'
        }
      },
      current: {
        color: 'tomato'
      }
    },
    MuiPickersModal: {
      dialogAction: {
        color: 'lightsalmon',
      },
    },
  },
});

export class BookRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      submit: false,
      selectedDate : new Date(),
      guests: '',
      time: '18:00'
    }
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleGuests = num => {
    this.setState({ guests: num.target.value });
  };
  handleTimeChange = num => {
    this.setState({time: num.target.value})
  }

  render() {
    return <Grid container className='bookRestaurant'>
      <Button onClick={this.handleClickOpen} variant="contained" className="bookRestaurant__openBtn">
        <BeenhereIcon className="bookRestaurant__icon" />
        Забронювати стіл
      </Button>

      <Dialog
        onClose={this.handleClose}
        open={this.state.open}
        className="bookRestaurant__dialog"
      >
      <CloseIcon color="primary" onClick={this.handleClose} cursor="pointer" className="bookRestaurant__closeBtn" />
      <Typography className="bookRestaurant__title">Забронювати стіл</Typography>
        <form onSubmit={this.handleClickSubmit} className="bookRestaurant__form">
                <FormControl margin={"normal"} className = "bookRestaurant__label">
                  <InputLabel htmlFor="inp-name">Ваше ім'я та прізвище</InputLabel>
                  <Input
                    id="inp-name"
                    type="text"
                    name="name"
                    required />
                </FormControl>

                <MuiThemeProvider theme={InlineDatePickerTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
            label="Дата"
            className="bookRestaurant__label"
            disablePast
            required
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            style={{marginTop: 8}}
            format='DD MMMM'
            />
          </MuiPickersUtilsProvider>
          </MuiThemeProvider>

                <TextField
                label="Час"
                className="bookRestaurant__label"
                margin="normal"
                onChange={this.handleTimeChange}
                type="time"
                required
                value={this.state.time} />

                <FormControl margin={"normal"} className = "bookRestaurant__label">
                  <InputLabel htmlFor="inp-phone">Контактний телефон</InputLabel>
                  <Input
                    id="inp-phone"
                    type="number"
                    name="phone"
                    required />
                </FormControl>

                <InputMask
            mask="999"
            value={this.state.guests}
            onChange={this.handleGuests}
            maskChar=''
          >
            {() => <TextField
              type="text"
              empty= 'false'
              label="Кількість осіб"
              required
              className="bookRestaurant__label"
              margin="normal"
              />}
          </InputMask>

                <Button className="signIn__submitBtn" type={"submit"} color={"primary"} variant={"contained"} fullWidth>
                  Забронювати
                </Button>
              </form>
              <Dialog
        onClose={this.handleCloseSubmit}
        open={this.state.submit}
        className="bookRestaurant__dialog"
      >
      <CloseIcon color="primary" onClick={this.handleClose} cursor="pointer" className="bookRestaurant__closeBtn" />
       <Typography className="bookRestaurant__SubmitMsg">Дякуємо за заявку!<br/>Адміністрація ресторану зв'яжеться з вами найближчим часом.</Typography>
      </Dialog>
        <Grid>
        </Grid>
      </Dialog>
    </Grid>
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickSubmit = (e) => {
    e.preventDefault()
    this.setState({ submit: true });

    fetch(`${host}/book`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target[0].value,
        date: e.target[1].value,
        time: e.target[2].value,
        phone: e.target[3].value,
        quantity: e.target[4].value,
        email: this.props.email
      })
    })
  };

  handleCloseSubmit = () => {
    this.setState({ submit: false, open: false });
  };
}

export default BookRestaurant;