import React from 'react';

import { Grid, Typography, Button, Dialog, Tabs, Tab, FormControl, InputLabel, Input } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tab: 0
    }
  }

  render() {
    return <Grid className="signIn">
      <Button onClick={this.handleClickOpen} className='signIn__openBtn'>
        <AccountCircle className='signIn__icon' />
        <Typography className='signIn__textBtn' variant="subtitle1">Вхід в акаунт</Typography>
      </Button>

      <Dialog
        onClose={this.handleClose}
        open={this.state.open}
        className="signIn__dialog"
      >
        {/* Tabs */}
        <Tabs value={this.state.tab}
          onChange={this.handleChange}
          indicatorColor="primary"
          centered
          variant="fullWidth"
          textColor="primary">
          

          <Tab label="Вхід"/>
          <Tab label="Реєстрація"/>
        </Tabs>
        {/* {this.state.tab === 0}  */}
        <Grid>
        <form onSubmit={this.handleSubmit} className="signIn__form">
                <FormControl margin={"normal"} className = "signIn__label">
                  <InputLabel htmlFor="inp-email">Адреса електронної пошти</InputLabel>
                  <Input
                    id="inp-email"
                    type="email"
                    name="email"
                    required />
                </FormControl>

                <FormControl margin={"normal"} className = "signIn__label">
                  <InputLabel htmlFor="inp-password">Пароль</InputLabel>
                  <Input
                    id="inp-password"
                    type="password"
                    name="email"
                    required />
                </FormControl>

                <Button className="signIn__submitBtn" type={"submit"} color={"primary"} variant={"contained"} fullWidth>
                  <AccountCircle />
                    {this.state.tab === 0 && <Typography className="signIn__submitBtn__textBtn">Увійти</Typography>} 
                    {this.state.tab === 1 && <Typography className="signIn__submitBtn__textBtn">Зареєструватись</Typography>}
                </Button>
              </form>
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

  handleChange = (event, tab) => {
    this.setState({ tab });
  };
};

export default SignIn;

