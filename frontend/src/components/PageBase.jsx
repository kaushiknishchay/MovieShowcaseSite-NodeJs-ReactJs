import React from 'react';
import PropTypes from 'prop-types';
import CustomAppBar from '../containers/AppBar';


const PageBase = ({ children }) => (
  <React.Fragment>
    <CustomAppBar />
    <div
      style={{
        height: 0, // 64,
      }}
    />
    {children}
  </React.Fragment>
);
PageBase.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.element]).isRequired,
};


export default PageBase;
