import React, { Component } from 'react';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import MovieGridContainer from '../MovieGridContainer';
import AdminPageBase from './AdminPageBase';
import CustomPaper from '../../components/ui/CustomPaper';


class AdminHome extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }

  render() {
    return (
      <AdminPageBase>
        <CustomPaper>
          <FormControl
            fullWidth
          >
            <InputLabel
              fullWidth
              htmlFor="age-simple"
            >
              Age
            </InputLabel>
            <Select
              fullWidth
              value={this.state.age}
              onChange={this.handleChange}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              <MenuItem value="">
                <em>
                  None
                </em>
              </MenuItem>
              <MenuItem value={10}>
                Ten
              </MenuItem>
              <MenuItem value={20}>
                Twenty
              </MenuItem>
              <MenuItem value={30}>
                Thirty
              </MenuItem>
            </Select>
          </FormControl>
        </CustomPaper>
        <br />
        <CustomPaper dark>
          <MovieGridContainer
            checkedGenre={[]}
            checkedLanguages={[]}
          />
        </CustomPaper>
      </AdminPageBase>
    );
  }
}

AdminHome.propTypes = {};

function initMapStateToProps(state) {
  const movie = Map(state.movie);
  return {
    languageList: movie.get('languageList').toJS(),
    genreList: movie.get('genreList').toJS(),
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(AdminHome);
