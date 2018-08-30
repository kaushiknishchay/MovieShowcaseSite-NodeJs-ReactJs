import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Button from '@material-ui/core/Button/Button';
import map from 'lodash/map';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '@material-ui/core/List/List';
import PropTypes from 'prop-types';


const DrawerLanguageGenreFilters = ({
  languageList, genreList,
  handleLanguageGenreToggle,
  checkedLanguages, checkedGenre,
  resetFilter,
}) => (
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
          onClick={resetFilter('language')}
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
          onClick={handleLanguageGenreToggle(indx, 'lang')}
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
          onClick={resetFilter('genre')}
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
          onClick={handleLanguageGenreToggle(indx, 'genre')}
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
);

DrawerLanguageGenreFilters.propTypes = {
  languageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  genreList: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLanguageGenreToggle: PropTypes.func.isRequired,
  checkedLanguages: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkedGenre: PropTypes.arrayOf(PropTypes.number).isRequired,
  resetFilter: PropTypes.func.isRequired,
};


export default DrawerLanguageGenreFilters;
