import React from 'react';
import NewRestaurant from './newRestaurant/NewRestaurant'

import { Grid, Typography } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';


export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootHeight: 0
    }
  }

  // componentDidMount () {
  //   setTimeout(() => {
  //     if(window.innerHeight > document.querySelector('#root').offsetHeight) document.querySelector('.footer').setAttribute("style", "position:absolute; bottom: 0;")
  //   }, 0)
  // }

  render() {
    return <Grid container justify="space-around" className="footer">
      <Grid item sm={4}>
        <Grid className="footer__field">
          <CallIcon className="footer__icon"/><Typography className="footer__textfield">+38 (063) 473-71-49</Typography>
        </Grid>
        <Grid className="footer__field">
        <EmailIcon className="footer__icon"/><Typography className="footer__textfield">support@restogram.com</Typography>
        </Grid>
      </Grid>

      <Grid item sm={4} alignItems="center" container>
      <Grid className="footer__field">
          <NewRestaurant />
        </Grid>
      </Grid>

    </Grid>
  }
}

export default Footer;
