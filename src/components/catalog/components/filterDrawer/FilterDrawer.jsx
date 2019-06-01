import React from 'react';
import Filter from '../filter/Filter'

import { Grid, Drawer, Button} from '@material-ui/core';

class FilterDrawer extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = open => () => {
    this.setState({
      open
    });
  };

  render() {

    return (
      <Grid className="filterDrawer">
        <Button onClick={this.toggleDrawer(true)} className="filterDrawer__btn"><img alt="filter" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPXSURBVGhD7VlLTxNRFCbRRBe6lfIDfCQ+ly6gW+URFxS1JRINkpiYyEtd6EpkIZGoiVsXRlZaIwsXJoKGhbiCAjOt1LawEHSjtFKqYaZTuJ5ze0rqeNvMo9Ma7Zd8YR6d73znvs6doaaKKqqo4v+FGgkdU2JyvxqT/UpUkoAJOE9z8mNpju71qYvyEXpMiNTYnsPI5Fht8+q46zMy+dbVRLdLj81weDcYvarGpDCYZOYohTFxFgrtIrktpF7XHkImx13LyTd1LEvXEt0uHdjExHZsWWjluNikcaIGaPWiJslvwdFElI/yARomQmNWqUTlgBKW9lMYDhxO2WRcS6tjdSfosn1AAqeAKZGRUhC1MQaFcwZqRLoArZYRGSglYd5oalQ+R2HtIeFuew+cpNNsT5QhiRwxVkl6BpOIN3je4THNCceGUyFCzDX9nLEMvjrFpNn8ACNDA+zx0C1HiNr5saBnpkWrmWnw4pUnjLzoaWQPXt51hKitjwceemDFakeSLXPAQgW98UeduNzRyp4ERxwhauvjgYcVUdE0DCUWvKYXRXa2NrK+G50l473RO7w38K8oESTuAMiWecAWYl4kerr+OOvuOuMIUVsUE+ZKiGyZgxoJHhUJVpazB8mecWBXisUqR5z0ZM844EG/XqjShESekj3jgIckkRiynHUkn7B6zZE948BlN/0pypB6wXLXkRxhuH8je8YBiaiFEil3HckRPClkzzgwEZEYEoPhmi+qCUZ4feASN53TGHx0kz18dZ8NPxt0JJGCb36VqCNIa0OryGSvFKFxzU92ePAfWX7/xoIYkbvJnnEU26JUqo5Y2qIgYNP4QSRYiToCm8Yg2TKPQsOrXHVkc/0nJx7D/OgjW+ZR7MUq/x1CXyfsEN91cnGyifzgy66tFysEtERvfhLIcteR9Zh8hexYR/bjgzyjFy8X+ccH5t9GduwBP8nAEKvE56Cksji3j2xYA5s4vzM97X2RnvalgM+V6KQHP5qJAjrC+dENTRq+TXasQ53ydWkBH8tRDXg71ViwA4aZJgxskRtr3xnLZFh6eWHrGsZIB9rX0wHvGtmxDjSuTwSvK9FgC3T5Wr4ZO2QZjSG0r1/4OR9OEblZm/I1aTNnG7kZO9iMntyBQ4oPrYDXj+eJek9LvKGtWVmY2YuTUG/KCrEneBILQawVU6hNFpxDosGTSrjbeHfTP3p6oAVXRAbNEDVwiS3Jp1EjiLtbm+Juz2/dnS2acj9uIUQmixGekfFZ28Wu1MBNHe8l2G5DK88C40CVuMKv4T34jeUNYBVVVFHFP4Caml+0TsHC8hEN/QAAAABJRU5ErkJggg==" /></Button>

        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <Grid
            role="button"
            className="filterDrawer__body"
            // onClick={this.toggleDrawer(false)}
            // onKeyDown={this.toggleDrawer(false)}
          >
             <Filter getFilter={this.props.getFilter} filter={this.props.filter}/>
          </Grid>
        </Drawer>
       
      </Grid>
    );
  }
}

export default FilterDrawer;