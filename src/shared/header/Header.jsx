import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../media/logo.png';
// import Lang from '../header/components/lang/Lang';
// import SignIn from '../header/components/signIn/SignIn';

import { Grid } from '@material-ui/core';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <Grid container alignItems={'center'} className="header">
      <Grid item xs={1} />
      <Grid item md={6} sm={7} xs={8}>
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
      </Grid>
      {/* <Grid item md={3} sm={1} xs={1}>
        <Lang />
      </Grid>
      <Grid item md={2} sm={3} xs={1}>
        <SignIn />
      </Grid> */}
    </Grid>
  }
}

export default Header;
