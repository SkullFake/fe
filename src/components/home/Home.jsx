import React from 'react';
import Header from '../../shared/header/Header'
import Footer from '../../shared/footer/Footer';
import { Link } from 'react-router-dom';

import { Grid, Typography, TextField, createMuiTheme, MuiThemeProvider, Button, List, ListItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { Scrollbars } from 'react-custom-scrollbars';
import MomentUtils from '@date-io/moment';
import InputMask from 'react-input-mask';
import 'moment/locale/uk';
import { host } from '../../const/node-server-config';


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

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate : new Date(),
      guests: '',
      time: '18:00',
      restaurants: null,
      showCity: [],
      currentCity: '',
      isCitySelected: false,
      showRestaurant: [],
      currentRestaurant: '',
      isRestaurantSelected: false
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

  componentWillMount() {
    fetch(`${host}/getRestourants`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => this.setState({restaurants: res}));
  }

  render() {
    return <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
      <Header /> <Grid className="home" container alignItems={"center"} direction={"column"}>
      {/* {(this.state.restaurants) ? <img src={`${this.state.restaurants[0].image}`} /> : ''} */}
      <Grid className="home__main">
        <Typography className="home__title">Бронювання ресторану в один дотик</Typography>
        <Grid className="home__search" >

          <Grid container alignItems="center" justify="space-evenly">
          
            <Grid item md={2} sm={4} xs={12} className="home__search__boxField">
              <TextField
                label="Місто"
                className="home__search__field"
                margin="normal"
                variant="outlined"
                value={this.state.currentCity}
                onFocus={this.getCity} 
                onChange={this.onChangeCity} 
                onBlur={this.lostFocusCity}
              />
              <Scrollbars className="home__search_list" autoHeight style={{position: 'absolute'}}>
              <List component="nav">
               {this.state.showCity.map( (item, id) => (
                   <ListItem className="home__search_listItem" button key={id} onMouseDown={this.selectCity}>
                     {item}
                    </ListItem>
                ))}
              </List>
              </Scrollbars>
            </Grid>

            <Grid item md={2} sm={4} xs={12} className="home__search__boxField">
              <TextField
                label="Заклад"
                className="home__search__field"
                margin="normal"
                variant="outlined"
                value={this.state.currentRestaurant}
                onChange={this.onChangeRestaurant} 
                onBlur={this.lostFocusRestaurant}
              />
              <Scrollbars className="home__search_list" autoHeight style={{position: 'absolute'}}>
              <List component="nav">
               {this.state.showRestaurant.map( (item, id) => (
                   <ListItem className="home__search_listItem" button key={id} onMouseDown={this.selectRestaurant}>
                     {item}
                    </ListItem>
                ))}
              </List>
              </Scrollbars>
            </Grid>

            <Grid item md={2} sm={4} className="home__search__boxField">
            <MuiThemeProvider theme={InlineDatePickerTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
            label="Дата"
            variant="outlined"
            className="home__search__field"
            disablePast
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            style={{marginTop: 8}}
            format='DD MMMM'
            />
          </MuiPickersUtilsProvider>
          </MuiThemeProvider>
            </Grid>
            <Grid item md={2} sm={3} className="home__search__boxField">
          <TextField
                label="Час"
                className="home__search__field"
                margin="normal"
                onChange={this.handleTimeChange}
                variant="outlined"
                type="time"
                required
                value={this.state.time} />
      </Grid>

            <Grid item md={2} sm={3} className="home__search__boxField">
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
              
                className="home__search__field"
                margin="normal"
                variant="outlined"
              />}
          </InputMask>
            </Grid>

          </Grid>
          <Button 
            variant="contained"
            className="home__search__btn">
              <Link 
                to={{
                  city: `${this.state.currentCity}`,
                  name: `${this.state.currentRestaurant}`,
                  pathname: "catalog"
              }}>Пошук</Link>
          </Button>
        </Grid>
        
      </Grid>
      <Footer />
    </Grid>
    </Grid>
  }

  onChangeCity = e => {
    let filter = e.target.value.toUpperCase();
    let allCities = [];

    for (let i in this.state.restaurants) {
      if( !allCities.includes(this.state.restaurants[i].city) ) allCities.push(this.state.restaurants[i].city)
    }

    let showCity = [];
    for (let i = 0; i < allCities.length; i++) {
      if (allCities[i].toUpperCase().indexOf(filter) > -1) {
        showCity = [...showCity, allCities[i]];
      }
      if (filter === ''){
        showCity = [];
      }
    }
    this.setState({currentCity: e.target.value, showCity, isCitySelected: false});
  };

  lostFocusCity = e => {
      this.state.isCitySelected ? this.setState({showCity: [] }) : this.setState({showCity: [], currentCity: ''})
  }

  selectCity = e => {
    this.setState({currentCity: e.target.textContent, isCitySelected: true})
  }

  // Restaurant

  onChangeRestaurant = e => {
    let filter = e.target.value.toUpperCase();
    let allRestaurant = [];

    for (let i in this.state.restaurants) {
      if(this.state.restaurants[i].city === this.state.currentCity) {
        allRestaurant.push(this.state.restaurants[i].name);
      }
    }

    let showRestaurant = [];
    for (let i = 0; i < allRestaurant.length; i++) {
      if (allRestaurant[i].toUpperCase().indexOf(filter) > -1) {
        showRestaurant = [...showRestaurant, allRestaurant[i]];
      }
      if (filter === ''){
        showRestaurant = [];
      }
    }
    this.setState({currentRestaurant: e.target.value, showRestaurant, isRestaurantSelected: false});
  };

  lostFocusRestaurant = e => {
      this.state.isRestaurantSelected ? this.setState({showRestaurant: [] }) : this.setState({showRestaurant: [], currentRestaurant: ''})
  }

  selectRestaurant = e => {
    this.setState({currentRestaurant: e.target.textContent, isRestaurantSelected: true})
  }
  
};

export default Home;
