import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { host } from '../../../../const/node-server-config'
import Pagination from '../../../pagination/Pagination'
import LoadingSpinner from '../../../../shared/loading-spinner/LoadingSpinner'

export class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: [],
      restaurants: [],
      ItemsArr: [],
      turn: false
    }
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  componentWillReceiveProps(nextProps) {
    let condition = nextProps.filter;
    let filterArr = (this.state.restaurants).filter((item) => {
      for (let key in condition) {
        if (item[key] === undefined || item[key] !== condition[key])
          return false;
      }
      return true;
    });

    let ItemsArr = [...Array(filterArr.length).keys()].map(i => ({ id: (i+1), el: <Grid item xs={10} sm={5}>
  <Link to={`/restaurant/${filterArr[i].name}`}>
  <Card className="list__item">
  <CardActionArea>
    <CardMedia
      component="img"
      alt="will be dynamic"
      image={`${filterArr[i].images[0]}`}
    />
    <CardContent>
      <Typography variant="subtitle1">
        {filterArr[i].name}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
</Link> 
</Grid>}));

this.setState({ItemsArr}) 
  }
  
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
        let condition = this.props.filter;
        if(condition.city === '') delete condition.city;
        if(condition.name === '') delete condition.name;
        
        let filterArr = (this.state.restaurants).filter((item) => {
          for (let key in condition) {
            if (item[key] === undefined || item[key] !== condition[key])
              return false;
          }
          return true;
        });

        let ItemsArr = [...Array(filterArr.length).keys()].map(i => ({ id: (i+1), el: <Grid item xs={10} sm={5}>
      <Link to={`/restaurant/${filterArr[i].name}`} filter={filterArr[i]}>
      <Card className="list__item"> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="will be dynamic"
          image={`${filterArr[i].images[0]}`}
        />
        <CardContent>
          <Typography variant="subtitle1">
            {filterArr[i].name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link> 
    </Grid>}));
    this.setState({ItemsArr}) 
    })
  }

  render() {
    
    if(this.state.restaurants.length) { return <React.Fragment>
    <Grid container justify={"space-evenly"} className="list">
        {this.state.ItemsArr.map(item => <React.Fragment key={item.id}>{item.el}</React.Fragment>)}
      </Grid> 
      <Pagination items={this.state.ItemsArr} onChangePage={this.onChangePage} />
    </React.Fragment>
    } else {
      return <LoadingSpinner />
    }
    

    }
};

export default List;

