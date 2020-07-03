import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Config from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default class PersonList extends React.Component {
  state = {
    collection: "",
    field: "",
    integrationName: "",
    total: "",
  };

  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
    console.log("new value", evt.target.value);
  }

  handleSubmit = (event) => {
    console.log("Entra delete");
    var params = new URLSearchParams();
    params.append("collection", this.state.collection);
    params.append("value", this.state.value);
    params.append("field", this.state.field);
    var request = {
      params: params,
    };
    //event.preventDefault(); No necesario.
    console.log("request: 127.0.0.1:" + request);
    console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);
    console.log("process.env.REACT_APP_PORT:", process.env.REACT_APP_PORT);

    axios.delete(`${Config.backendUrl}/firestore/`, request).then((res) => {
      console.log("react1: ", res);
      console.log("react2: ", res.data);
      this.setState({ total: res.data });
    });
  };

  handleSubmitCount = (event) => {
    console.log("Entra count");
    var params = new URLSearchParams();
    params.append("collection", this.state.collection);
    params.append("value", this.state.value);
    params.append("field", this.state.field);
    var request = {
      params: params,
    };
    //event.preventDefault();
    console.log("request 127.0.0.1:" + request);
    console.log("BACKEND_HOST:", process.env);
    axios.get(`${Config.backendUrl}/firestore/`, request).then((res) => {
      this.setState({ total: res.data });
    });
  };

  render() {
    return (
      <span>
        <form>
          <TextField
            name="collection"
            onChange={(event) => this.handleChange(event, "collection")}
            helperText="Collection"
            variant="outlined"
            required
            margin="dense"
          />
          <TextField
            name="field"
            onChange={(event) => this.handleChange(event, "field")}
            helperText="Field"
            variant="outlined"
            required
            margin="dense"
          />

          <TextField
            name="value"
            onChange={(event) => this.handleChange(event, "value")}
            helperText="Value"
            variant="outlined"
            required
            margin="dense"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            disableElevation
            type="button"
          >
            Delete Registers
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmitCount}
            disableElevation
            type="button"
          >
            Count Registers
          </Button>

          <br />
          <br />
          <Typography variant="h6" gutterBottom>
            <span>{this.state.total}</span>
          </Typography>
        </form>
      </span>
    );
  }
}
