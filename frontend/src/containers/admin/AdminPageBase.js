/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import AdminSideBar from './SideBar';
import CustomPaper from '../../components/ui/CustomPaper';
import PageBase from '../../components/PageBase';


const AdminPageBase = ({ children }) => (
  <PageBase>
    <div className="content">
      <Grid container spacing={24}>
        <AdminSideBar />
        <Grid item xs={12} lg={9}>
          <CustomPaper dark>
            {children}
          </CustomPaper>
        </Grid>
      </Grid>
    </div>
  </PageBase>
);
AdminPageBase.propTypes = {
  children: PropTypes.any.isRequired,
};


export default AdminPageBase;
