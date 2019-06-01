import React from 'react';
import Header from '../../shared/header/Header'
import Footer from '../../shared/footer/Footer';
import { Grid, Typography} from '@material-ui/core';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import BookRestaurant from './bookRestaurant/BookRestaurant';
import PlaceIcon from '@material-ui/icons/Place';
import { host } from '../../const/node-server-config';
import LoadingSpinner from '../../shared/loading-spinner/LoadingSpinner'

class Restaurant extends React.Component {
  state = {
    dayNumber: new Date().getDay(),
    restaurant: [],
    images: []
  };

  componentWillMount() {
    fetch(`${host}/getRestourants`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => this.setState({restaurants: res}))
      .then(()=> {
        let condition = {name: this.props.match.params.name};
        let filterArr = (this.state.restaurants).filter((item) => {
        for (let key in condition) {
          if (item[key] === undefined || item[key] !== condition[key]) return false;
        }
        return true;
        });
        this.setState({restaurant: filterArr[0]})
      })
      .then(()=> {
        let dayNumber = this.state.dayNumber;
        if (dayNumber === 0 ) dayNumber = 7
        document.querySelector(`.restaurant__time_day:nth-child(${dayNumber + 1})`).className = `${document.querySelector(`.restaurant__time_day:nth-child(${dayNumber + 1})`).className} restaurant__time_currentDay`
        document.querySelector('.restaurant__description').innerHTML = this.state.restaurant.description;
        
        let images = [];
        for (let key in this.state.restaurant.images) {
          images.push({original: this.state.restaurant.images[key], thumbnail: this.state.restaurant.images[key]})
        }
        this.setState({images})
      })
  }

  render() {
    if(!this.state.restaurant.name) return <LoadingSpinner />

    return <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
    <Header />
      <Grid container justify={"center"} direction={"row"} className="restaurant">
      <Grid item sm={1} />
      <Grid item sm={7} xs={11}>
        <Grid className="restaurant__title" container justify={"space-between"}>
          Ресторан "{this.state.restaurant.name}"
        </Grid>
        <ImageGallery items={this.state.images} showPlayButton={false}/> 
        <Grid className="restaurant__description"></Grid>
      </Grid>
      <Grid item sm={4} xs={11}>
        <BookRestaurant email={this.state.restaurant.email}/>
        <Grid><Typography className="restaurant__location"><PlaceIcon />{this.state.restaurant.location}</Typography>
          <iframe className="restaurant__map" src={this.state.restaurant.map} title="Maps" frameBorder="0" allowFullScreen/>
        </Grid>
        <Grid className="restaurant__time">
          <Typography className="restaurant__time_title">Час роботи:</Typography>
          <Typography className="restaurant__time_day">Пн: {this.state.restaurant.time.mon}</Typography>
          <Typography className="restaurant__time_day">Вт: {this.state.restaurant.time.tue}</Typography>
          <Typography className="restaurant__time_day">Ср: {this.state.restaurant.time.wed}</Typography>
          <Typography className="restaurant__time_day">Чт: {this.state.restaurant.time.thu}</Typography>
          <Typography className="restaurant__time_day">Пт: {this.state.restaurant.time.fri}</Typography>
          <Typography className="restaurant__time_day">Сб: {this.state.restaurant.time.sat}</Typography>
          <Typography className="restaurant__time_day">Нд: {this.state.restaurant.time.sun}</Typography>
        </Grid>
      </Grid>
      </Grid>
      <Footer />
    </Grid>
  }
}



export default Restaurant;