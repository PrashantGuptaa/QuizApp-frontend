import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Collapse, Fade, Slide, Grow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
   backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();
const { message, showAlertMessage, severity } = props;
  return (
    <div className={classes.root}>
      <Slide direction="down"  in ={showAlertMessage} mountOnEnter unmountOnExit {...{ timeout: 1000 }}>
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
      </Slide>
    </div>
  );
}
