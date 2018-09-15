import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';


const CastAvatar = ({ cast: c }) => {
  let initials = c.name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return (
    <div
      style={{
        minWidth: 90,
        margin: '5px 10px',
        textAlign: 'center',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Avatar
        key={c.name}
        alt={c.name}
        src={c.photo}
        style={{
          height: 60,
          width: 60,
          margin: '5px auto 10px',
        }}
      >
        {!c.photo ? initials : ''}
      </Avatar>
      <Typography
        noWrap
        style={{ color: '#fff' }}
        variant="body1"
      >
        {c.name}
        <br />
        as
        <br />
        {c.roleName}
      </Typography>
    </div>
  );
};

CastAvatar.propTypes = {
  cast: PropTypes.shape({
    name: PropTypes.string.isRequired,
    roleName: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
};


export default CastAvatar;
