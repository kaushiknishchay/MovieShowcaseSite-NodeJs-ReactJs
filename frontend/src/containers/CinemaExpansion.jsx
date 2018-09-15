import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';


import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import API from '../service';


class CinemaExpansion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimings: [],
      activeType: null,
      activeScreenObj: null,
    };
  }

  handleScreenSelect = screen => (event) => {
    this.setState({
      activeScreenObj: screen,
      activeType: screen.screenType,
    });
  };

  handleExpand = (event, isExpanded) => {
    const { showTimings } = this.state;
    if (isExpanded && isEmpty(showTimings)) {
      const { movieId, cinema } = this.props;

      API.getMovieShowsByCinema(movieId, cinema._id)
        .then((res) => {
          this.setState({
            showTimings: res.data,
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const {
      showTimings, activeType,
      activeScreenObj,
    } = this.state;

    const {
      cinema,
    } = this.props;

    return (
      <ExpansionPanel
        style={{
          margin: 10,
          borderRadius: 4,
          backgroundColor: '#333',
        }}
        onChange={this.handleExpand}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon nativeColor="#fff" />}>
          <div className="col">
            <Typography color="inherit" variant="subheading" gutterBottom>
              {cinema.name}
            </Typography>
            <Typography color="inherit" variant="caption">
              {cinema.address}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{
            margin: 0,
            paddingLeft: 12,
            paddingRight: 12,
            backgroundColor: '#555',
          }}
          className="col"
        >
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          >
            {
              map(showTimings, screen => (
                <Button
                  size="small"
                  variant="text"
                  color="secondary"
                  key={screen.screenType}
                  style={{
                    background: activeType === screen.screenType ? '#c7056c' : '#a9042d',
                    color: '#fff',
                    margin: '5px 5px',
                  }}
                  onClick={this.handleScreenSelect(screen)}
                >
                  {screen.screenType}
                </Button>
              ))
            }
          </div>
          <Divider />
          <div>
            {
              activeScreenObj
              && map(activeScreenObj.showTimesAndPrice, screen => (
                <Button
                  size="small"
                  variant="text"
                  color="secondary"
                  key={screen.time}
                  style={{
                    background: '#c7056c',
                    color: '#fff',
                    margin: '5px 5px',
                  }}
                >
                  {screen.time}
                </Button>
              ))
            }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

CinemaExpansion.propTypes = {
  cinema: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  movieId: PropTypes.string.isRequired,
};

export default CinemaExpansion;
