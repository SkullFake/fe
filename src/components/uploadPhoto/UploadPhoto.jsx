import React from 'react';
import axios from 'axios';

export class UploadPhoto extends React.Component {
  state = {
    }
    componentDidMount() {
    axios.get(`http://localhost:5000/files`)
    .then(res => {
    console.log(res)
    })
    }
    render() {
        return (
          <ul>
            {/* { this.state.people.map(people => <li>{people.name}</li>)} */}
          </ul>
        )
      }
    }

export default UploadPhoto;

