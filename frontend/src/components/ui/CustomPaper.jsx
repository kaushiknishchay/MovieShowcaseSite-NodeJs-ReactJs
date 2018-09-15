/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const CustomPaper = ({
  classes, children, dark, ...props
}) => (
  <Paper
    className={
      dark
        ? `${classes.root} dark-paper`
        : classes.root
    }
    k={console.log([
      dark ? {
        root: `${classes.root} dark-paper`,
      } : {
        root: classes.root,
      }])}
    {...props}
  >
    {children}
  </Paper>
);

CustomPaper.defaultProps = {
  dark: false,
};

CustomPaper.propTypes = {
  dark: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};


export default withStyles(styles)(CustomPaper);
