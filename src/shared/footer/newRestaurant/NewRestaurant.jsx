import React from 'react';

import { Grid, Button, Dialog, FormControl, InputLabel, Input, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import { host, port } from '../../../const/node-server-config';

export class NewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      submit: false
    }
  }

  render() {
    return <Grid container className='newRestaurant'>
      <Button onClick={this.handleClickOpen} variant="contained" className="newRestaurant__openBtn">
        <AddCircleIcon className="newRestaurant__icon" />Додати заклад
          </Button>

      <Dialog
        onClose={this.handleClose}
        open={this.state.open}
        className="newRestaurant__dialog"
      >
      <CloseIcon color="primary" onClick={this.handleClose} cursor="pointer" className="newRestaurant__closeBtn" />
      <Typography className="newRestaurant__title">Контактна форма</Typography>
        <form onSubmit={this.handleClickSubmit} className="newRestaurant__form">
                <FormControl margin={"normal"} className = "newRestaurant__label">
                  <InputLabel htmlFor="inp-name">Ваше ім'я</InputLabel>
                  <Input
                    id="inp-name"
                    type="text"
                    name="name"
                    required />
                </FormControl>

                <FormControl margin={"normal"} className = "newRestaurant__label">
                  <InputLabel htmlFor="inp-restaurantName">Назва закладу</InputLabel>
                  <Input
                    id="inp-restaurantName"
                    type="text"
                    name="restaurantName"
                    required />
                </FormControl>

                <FormControl margin={"normal"} className = "newRestaurant__label">
                  <InputLabel htmlFor="inp-phone">Контактний телефон</InputLabel>
                  <Input
                    id="inp-phone"
                    type="number"
                    name="phone"
                    required />
                </FormControl>

                <FormControl margin={"normal"} className = "newRestaurant__label">
                  <InputLabel htmlFor="inp-email">Адреса електронної пошти</InputLabel>
                  <Input
                    id="inp-email"
                    type="email"
                    name="email"
                    required />
                </FormControl>


                <Button className="signIn__submitBtn" type={"submit"} color={"primary"} variant={"contained"} fullWidth>
                  Додати заклад
                </Button>
              </form>
              <Dialog
        onClose={this.handleCloseSubmit}
        open={this.state.submit}
        className="newRestaurant__dialog"
      >
      <CloseIcon color="primary" onClick={this.handleClose} cursor="pointer" className="newRestaurant__closeBtn" />
       <Typography className="newRestaurant__SubmitMsg">Дякуємо за заявку!<br/>Наші менеджери зв'яжуться з вами найближчим часом.</Typography>
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

    fetch(`${host}:${port}/newRestaurant`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target[0].value,
        restaurant: e.target[1].value,
        phone: e.target[2].value,
        email: e.target[3].value
      })
    })

  };

  handleCloseSubmit = () => {
    this.setState({ submit: false, open: false });
  };
}

export default NewRestaurant;