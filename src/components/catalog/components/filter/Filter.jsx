import React from 'react';

import { Grid, Typography, TextField, createMuiTheme, MuiThemeProvider, Checkbox, FormControlLabel, List, ListItem  } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import InputMask from 'react-input-mask';
import { Scrollbars } from 'react-custom-scrollbars';
import 'moment/locale/uk';
import { host } from '../../../../const/node-server-config';


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
      restaurant: false,
      bar: false,
      pab: false,
      cafe: false,
      pizzeria: false,
      banquetHall: false,
      childrensCafe: false,
      fastFood: false,
      nightClub: false,
      karaoke: false,
      sushi: false,
      liveMusic: false,
      terrace: false,
      childrenRoom: false,
      broadcastSportingEvents: false,
      paymentCreditCard: false,
      foodWasTaken: false,
      deliveryFood: false,
      roundTheClockWork: false,
      allCities: null,
      showCity: [],
      currentCity: '',
      isCitySelected: false,
      restaurants: null,
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

  sendProps() {
    setTimeout(()=> {
      let fullFilter = {
        name: this.state.currentRestaurant,
        city: this.state.currentCity,
        restaurant: this.state.restaurant,
        bar: this.state.bar,
        pab: this.state.pab,
        cafe: this.state.cafe,
        pizzeria: this.state.pizzeria,
        banquetHall: this.state.banquetHall,
        childrensCafe: this.state.childrensCafe,
        fastFood: this.state.fastFood,
        nightClub: this.state.nightClub,
        karaoke: this.state.karaoke,
        sushi: this.state.sushi,
        liveMusic: this.state.liveMusic,
        terrace: this.state.terrace,
        childrenRoom: this.state.childrenRoom,
        broadcastSportingEvents: this.state.broadcastSportingEvents,
        paymentCreditCard: this.state.paymentCreditCard,
        foodWasTaken: this.state.foodWasTaken,
        deliveryFood: this.state.deliveryFood,
        roundTheClockWork: this.state.roundTheClockWork
      }

      let filter = {};
      
      Object.keys(fullFilter).filter((key) => {
        return fullFilter[key]
      }).map((i) => {
          filter[i] = true
          if(filter.city === true) filter.city = this.state.currentCity;
          if(filter.name === true) filter.name = this.state.currentRestaurant;
          return true;
        });
      this.props.getFilter(filter)
    },0)
  }

  changeCheckBox = el => {
    this.setState({ [el.target.name] : el.target.checked})
    el.target.parentElement.classList.toggle('filter__checkBox_checked');
    this.sendProps();
  }

  componentWillMount() {
    console.log(`${host}/getRestourants`)
    fetch(`${host}/getRestourants`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => this.setState({restaurants: res}));

    if(this.props.filter.city) {
      this.setState({currentCity: `${this.props.filter.city}`})
      setTimeout(()=>this.sendProps(),0)
    }

    if(this.props.filter.name) {
      this.setState({currentRestaurant: `${this.props.filter.name}`})
      setTimeout(()=>this.sendProps(),0)
    }
  }

  render() {
    return <Grid container className="filter" alignItems={"center"} justify={"center"} direction={"column"}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid container className="filter__section" direction="column" alignItems="center">
          <Typography className="filter__title">Пошук: </Typography>

            <Grid item xs={10} className="filter__boxField_search">
              <TextField
                label="Місто"
                className="filter__field"
                margin="normal"
                variant="outlined"
                fullWidth
                value={this.state.currentCity}
                onFocus={this.getCity} 
                onChange={this.onChangeCity} 
                onBlur={this.lostFocusCity}
              />
              <Scrollbars className="filter__field_list" autoHeight style={{position: 'absolute'}}>
              <List component="nav">
               {this.state.showCity.map( (item, id) => (
                   <ListItem className="filter__field_listItem" button key={id} onMouseDown={this.selectCity}>
                     {item}
                    </ListItem>
                ))}
              </List>
              </Scrollbars>
            </Grid>
            <Grid item xs={10} className="filter__boxField_search">
              <TextField
                label="Заклад"
                className="filter__field"
                margin="normal"
                variant="outlined"
                fullWidth
                value={this.state.currentRestaurant}
                onChange={this.onChangeRestaurant} 
                onBlur={this.lostFocusRestaurant}
              />
              <Scrollbars className="filter__field_list" autoHeight style={{position: 'absolute'}}>
              <List component="nav">
               {this.state.showRestaurant.map( (item, id) => (
                   <ListItem className="filter__field_listItem" button key={id} onMouseDown={this.selectRestaurant}>
                     {item}
                    </ListItem>
                ))}
              </List>
              </Scrollbars>
            </Grid>
            <Grid item xs={10} className="filter__boxField_search">
            <MuiThemeProvider theme={InlineDatePickerTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
            label="Дата"
            variant="outlined"
            className="filter__field"
            disablePast
            fullWidth
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            format='DD MMMM'
            />
          </MuiPickersUtilsProvider>
          </MuiThemeProvider>
            </Grid>
            <Grid item xs={10} className="filter__boxField_search">
        <TextField
        label="Час"
        type="time"
        required
        margin="normal"
        defaultValue="20:00"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        className="filter__field"
        variant="outlined"
        onChange={this.handleDateChange}
      />
      </Grid>
            <Grid item xs={10} className="filter__boxField_search">
            <InputMask
            mask="99"
            value={this.state.guests}
            onChange={this.handleGuests}
            maskChar=''
          >
            {() => <TextField
              type="text"
              empty= 'false'
              label="Кількість осіб"
              fullWidth
                className="filter__field"
                margin="normal"
                variant="outlined"
              />}
          </InputMask>
            </Grid>

          </Grid>        
          <Grid container className="filter__section" direction="column" alignItems="center">
        <Typography className="filter__title">Тип закладу: </Typography>
      
      <Grid item xs={10} className="filter__boxField">
        <FormControlLabel  
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.restaurant}
              onChange={this.changeCheckBox}
              name="restaurant"
            />
          }
          label="Ресторан"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
        <FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.bar}
              onChange={this.changeCheckBox}
              name="bar"
            />
          }
          label="Бар"
        />
        </Grid>
        <Grid item xs={10} className="filter__boxField">
        <FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.pab}
              onChange={this.changeCheckBox}
              name="pab"
            />
          }
          label="Паб"
        />  
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.cafe}
              onChange={this.changeCheckBox}
              name="cafe"
            />
          }
          label="Кафе"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.pizzeria}
              onChange={this.changeCheckBox}
              name="pizzeria"
            />
          }
          label="Піцерія"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.banquetHall}
              onChange={this.changeCheckBox}
              name="banquetHall"
            />
          }
          label="Банкетний зал"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.childrensCafe}
              onChange={this.changeCheckBox}
              name="childrensCafe"
            />
          }
          label="Дитяче кафе"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.fastFood}
              onChange={this.changeCheckBox}
              name="fastFood"
            />
          }
          label="Фаст-фуд"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
        <FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.nightClub}
              onChange={this.changeCheckBox}
              name="nightClub"
            />
          }
          label="Нічний клуб"
        />
        </Grid>
</Grid>
          <Grid container className="filter__section" direction="column" alignItems="center">
<Typography className="filter__title">Додатково: </Typography>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.karaoke}
              onChange={this.changeCheckBox}
              name="karaoke"
            />
          }
          label="Караоке"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.sushi}
              onChange={this.changeCheckBox}
              name="sushi"
            />
          }
          label="Суші"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">

<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.liveMusic}
              onChange={this.changeCheckBox}
              name="liveMusic"
            />
          }
          label="Жива музика"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.terrace}
              onChange={this.changeCheckBox}
              name="terrace"
            />
          }
          label="Тераса"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.childrenRoom}
              onChange={this.changeCheckBox}
              name="childrenRoom"
            />
          }
          label="Дитяча кімната"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.broadcastSportingEvents}
              onChange={this.changeCheckBox}
              name="broadcastSportingEvents"
            />
          }
          label="Трансляція спортивних подій"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.paymentCreditCard}
              onChange={this.changeCheckBox}
              name="paymentCreditCard"
            />
          }
          label="Оплата кредиткою"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">

<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.foodWasTaken}
              onChange={this.changeCheckBox}
              name="foodWasTaken"
            />
          }
          label="Їжа на виніс"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">

        <FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.deliveryFood}
              onChange={this.changeCheckBox}
              name="deliveryFood"
            />
          }
          label="Доставка їжі"
        />
</Grid>
<Grid item xs={10} className="filter__boxField">
<FormControlLabel
          control={
            <Checkbox
              className="filter__checkBox"
              checked={this.state.roundTheClockWork}
              onChange={this.changeCheckBox}
              name="roundTheClockWork"
            />
          }
          label="Цілодобова робота"
        />
    </Grid>
    </Grid>
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
    setTimeout(()=> {
      this.sendProps();
    },0)
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
    setTimeout(()=> {
      this.sendProps();
    },0) 
  }
};

export default Home;

