/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import map from 'lodash/map';
import range from 'lodash/range';
import List from '@material-ui/core/List/List';
import { Carousel } from 'react-responsive-carousel';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ListItem from '@material-ui/core/ListItem/ListItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/css/App.css';
import PageBase from '../components/PageBase';
import MovieGridContainer from './MovieGridContainer';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedLanguages: [],
      checkedGenre: [],
    };
  }


  handleLanguageGenreToggle = (value, type) => () => {
    const { checkedLanguages, checkedGenre } = this.state;

    const checkedObj = type === 'lang' ? checkedLanguages : checkedGenre;

    const typeKey = type === 'lang' ? 'checkedLanguages' : 'checkedGenre';

    const currentIndex = checkedObj.indexOf(value);
    const newChecked = [...checkedObj];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      [typeKey]: newChecked,
    });
  };


  render() {
    const {
      checkedLanguages,
      checkedGenre,
    } = this.state;

    const {
      languageList, genreList,
    } = this.props;

    return (
      <PageBase>
        <Carousel
          autoPlay
          showThumbs={false}
          showStatus={false}
          interval={2000}
          infiniteLoop
          dynamicHeight
        >
          {
            map(range(5), k => (
              <div key={`${k}_banner`}>
                <img
                  alt={`${k}_image`}
                  src={`https://picsum.photos/800/400/?random&${k}`}
                  style={{
                    width: '100%',
                  }}
                />
                <p className="legend">
                  {'Legend '}
                  {k}
                </p>
              </div>
            ))
          }

        </Carousel>
        <div className="content">
          <Drawer
            variant="permanent"
            classes={{
              docked: 'drawer__container',
              paper: 'drawer__content',
            }}
          >
            <List>
              <ListSubheader component="div">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  Languages
                  <Button
                    color="secondary"
                    variant="text"
                    size="small"
                    onClick={() => this.setState({
                      checkedLanguages: [],
                    })}
                  >
                    Clear All
                  </Button>
                </div>
              </ListSubheader>
              {
                map(languageList, (lang, indx) => (
                  <ListItem
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    key={lang}
                    button
                    dense
                    onClick={this.handleLanguageGenreToggle(indx, 'lang')}
                  >
                    <Checkbox
                      checked={checkedLanguages.indexOf(indx) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={lang} />
                  </ListItem>
                ))}
              <ListSubheader component="div">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  Genre
                  <Button
                    color="secondary"
                    variant="text"
                    size="small"
                    onClick={() => this.setState({
                      checkedGenre: [],
                    })}
                  >
                    Clear All
                  </Button>
                </div>
              </ListSubheader>
              {
                map(genreList, (genre, indx) => (
                  <ListItem
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    key={genre}
                    button
                    dense
                    onClick={this.handleLanguageGenreToggle(indx, 'genre')}
                  >
                    <Checkbox
                      checked={checkedGenre.indexOf(indx) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={genre} />
                  </ListItem>
                ))}
            </List>
            <Divider />
          </Drawer>
          <MovieGridContainer
            checkedGenre={checkedGenre}
            checkedLanguages={checkedLanguages}
          />
        </div>
      </PageBase>
    );
  }
}

function initMapStateToProps(state) {
  const movie = Map(state.movie);
  return {
    languageList: movie.get('languageList').toJS(),
    genreList: movie.get('genreList').toJS(),
  };
}

Home.propTypes = {
  languageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  genreList: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default connect(initMapStateToProps, null)(Home);
