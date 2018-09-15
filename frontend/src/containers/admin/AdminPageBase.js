/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import AdminSideBar from './SideBar';
import PageBase from '../../components/PageBase';


const AdminPageBase = ({ children }) => (
  <PageBase>
    <div className="content">
      <Grid container spacing={24}>
        <AdminSideBar />
        <Grid item xs={12} lg={9}>
          {children}
        </Grid>
      </Grid>
    </div>
  </PageBase>
);
AdminPageBase.propTypes = {
  children: PropTypes.any.isRequired,
};


export default AdminPageBase;
