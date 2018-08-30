/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Divider from '@material-ui/core/Divider/Divider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/css/App.css';
import PageBase from '../components/PageBase';
import MovieGridContainer from './MovieGridContainer';
import MovieCarousel from '../components/MovieCarousel';
import DrawerLanguageGenreFilters from '../components/DrawerLanguageGenreFilters';


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

  resetFilter = type => (event) => {
    const keyO = type === 'genre' ? 'checkedGenre' : 'checkedLanguages';
    this.setState({
      [keyO]: [],
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
        <MovieCarousel />

        <div className="content">
          <Drawer
            variant="permanent"
            classes={{
              docked: 'drawer__container',
              paper: 'drawer__content',
            }}
          >
            <DrawerLanguageGenreFilters
              checkedLanguages={checkedLanguages}
              checkedGenre={checkedGenre}
              genreList={genreList}
              resetFilter={this.resetFilter}
              languageList={languageList}
              handleLanguageGenreToggle={this.handleLanguageGenreToggle}
            />
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
