import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: 250,
  },
});

function handleSubmit(event) {
  event.preventDefault();
  console.log("Get....")
}

const TextFieldMargins = props => {
  const { classes } = props;

  return (
    <form className={classes.gird} onSubmit={handleSubmit} >
    <div className={classes.container}>
       
      <TextField className={classes.textField}
        helperText="Collection" variant="outlined" required
        margin="dense"
      />

      <TextField className={classes.textField}
        helperText="Field" variant="outlined" required
        margin="dense"
      />

      <TextField className={classes.textField}
        helperText="Value" variant="outlined" required
        margin="dense"
      />
    </div>

    <Button variant="contained" color="primary" disableElevation type="submit">
      Delete Registers
    </Button>
   
    </form>
  );
};

TextFieldMargins.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldMargins);