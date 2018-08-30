import React from 'react';
import Button from '@material-ui/core/Button/Button';
import EmptyResult from './EmptyResult';


const NotFound = () => (
  <div
    style={{
      backgroundColor: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <EmptyResult
      type="404"
      title=""
      subHeading=""
    />
    <Button
      size="large"
      color="primary"
      onClick={() => {
        window.location = '/';
      }}
    >
      Go Home
    </Button>
  </div>
);

export default NotFound;
