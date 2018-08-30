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

const CustomPaper = ({ classes, children, ...props }) => (
  <Paper className={classes.root} {...props}>
    {children}
  </Paper>
);

CustomPaper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.element]).isRequired,
};


export default withStyles(styles)(CustomPaper);
