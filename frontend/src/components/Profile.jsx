import React from 'react';
import Grid from '@material-ui/core/Grid';
import PageBase from './PageBase';
import CustomPaper from './ui/CustomPaper';


const Profile = () => (
  <PageBase>
    <Grid
      className="content__main"
      container
      spacing={24}
      style={{
        padding: '0rem 2rem',
      }}
    >
      <Grid item xs={12}>
        <CustomPaper>
          Logged In
        </CustomPaper>
      </Grid>
    </Grid>
  </PageBase>
);

export default Profile;
