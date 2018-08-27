/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import map from 'lodash/map';
import range from 'lodash/range';
import intersection from 'lodash/intersection';
import filter from 'lodash/filter';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer/Drawer';
import List from '@material-ui/core/List/List';
import Divider from '@material-ui/core/Divider/Divider';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import InfiniteScroll from 'react-infinite-scroll-component';


import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import '../styles/css/App.css';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Button from '@material-ui/core/Button/Button';
import MovieCard from './MovieCard';
import CustomAppBar from './AppBar';
import EmptyResult from './EmptyResult';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      wholeMovieList: [],
      checkedLanguages: [],
      pageNum: 1,
      checkedGenre: [],
    };
    this.languageList = [
      'English', 'Hindi', 'Tamil', 'Kannada', 'Marathi',
    ];
    this.genreList = [
      'Action', 'Adventure', 'Romance', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller',
    ];

    this.perPageItemCount = 6;
  }


  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/movie',
    })
      .then((res) => {
        if (res && res.data) {
          this.setState({
            wholeMovieList: res.data,
            moviesList: res.data.slice(0, this.perPageItemCount),
          });
        }
      });
  }

  fetchMoreMovies = () => {
    setTimeout(() => {
      const { wholeMovieList, pageNum } = this.state;

      const startIndex = this.perPageItemCount * pageNum;
      const endIndex = (pageNum + 1) * this.perPageItemCount;

      const newMovies = wholeMovieList.slice(startIndex, endIndex);

      this.setState(prevState => ({
        pageNum: prevState.pageNum + 1,
        moviesList: prevState.moviesList.concat(newMovies),
      }));
    }, 100);
  };

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
      wholeMovieList,
      moviesList: fullMovieList,
      checkedLanguages,
      checkedGenre,
    } = this.state;

    const checkedLanguagesValues = checkedLanguages.map(lang => this.languageList[lang]);

    const checkedGenresValues = checkedGenre.map(genre => this.genreList[genre]);

    let moviesList = fullMovieList;
    if (checkedLanguages.length > 0 || checkedGenre.length > 0) {
      moviesList = filter(
        fullMovieList,
        (movie) => {
          const genreMatching = intersection(movie.genre, checkedGenresValues);
          const langMatching = intersection(movie.languages, checkedLanguagesValues);

          if (checkedGenre.length === 0) return (langMatching.length > 0);
          if (checkedLanguages.length === 0) return (genreMatching.length > 0);
          return (langMatching.length > 0 && genreMatching.length > 0);
        },
      );
    }

    const hasMoreMovies = moviesList.length < wholeMovieList.length;


    return (
      <div>
        <CustomAppBar />
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
                map(this.languageList, (lang, indx) => (
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
                map(this.genreList, (genre, indx) => (
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
          <InfiniteScroll
            dataLength={moviesList.length}
            next={this.fetchMoreMovies}
            hasMore={hasMoreMovies}
            loader={(
              <div style={{ margin: '20px auto', width: '100%', textAlign: 'center' }}>
                <CircularProgress />
              </div>
            )}
          >
            <Grid
              className="content__main"
              container
              spacing={24}
              style={{
                padding: '0rem 2rem',
              }}
            >
              {
                moviesList.length === 0 && (
                  <Grid
                    item
                    xs={12}
                  >
                    <EmptyResult />
                  </Grid>
                )
              }

              {
                map(moviesList, movie => (
                  <MovieCard
                    key={movie._id}
                    name={`${movie.name}`}
                    desc={movie.synopsis}
                    censorRating={movie.censorRating}
                    genre={movie.genre}
                    language={movie.languages}
                    poster={movie.poster}
                    userRating={movie.userRating}
                  />
                ))
              }
            </Grid>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default App;
