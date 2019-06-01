import React from 'react';
import Header from '../../shared/header/Header'
import Footer from '../../shared/footer/Footer';
import Filter from './components/filter/Filter';
import List from './components/list/List'
import FilterDrawer from './components/filterDrawer/FilterDrawer'

import MediaQuery from 'react-responsive';
import { Grid } from '@material-ui/core';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    }
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleGuests = num => {
    this.setState({ guests: num.target.value });
  };

  getFilter = data => {
    this.setState({filter: data})
  }

  componentWillMount() {
    let newFilter = Object.assign({}, this.state.filter);
    if(this.props.location.city !== undefined) newFilter.city = `${this.props.location.city}`;
    if(this.props.location.name !== undefined) newFilter.name = `${this.props.location.name}`;

    this.setState({filter: newFilter})
  }

  render() {
    return <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
      <Header />
      <Grid className="catalog" container  direction={"row"}>
      <MediaQuery query="(min-width: 991px)">
            {(i) => i ? <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={2}><Filter filter={this.state.filter} getFilter={this.getFilter}/></Grid>
                            <Grid item xs={9}><List filter={this.state.filter}/></Grid>
                        </Grid> : 
                      
                      <Grid container>
                            <FilterDrawer getFilter={this.getFilter} filter={this.state.filter}/>
                            <Grid item xs={12}><List filter={this.state.filter}/></Grid>
                        </Grid> }
      </MediaQuery>

    </Grid>
    <Footer />
    </Grid>
  }
};

export default Home;

