import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const [collection, setCollection] = useState("");
  const [field, setField] = useState("");
  const [integrationName, setIntegrationName] = useState("");
  const [total, setTotal] = useState("");

  function handleChange(evt, field) {
    setField(evt.target.value);
    console.log("new value", evt.target.value);
  }

  function requestObject(url, method, params) {
    let configObject = {
      url: url,
      method: method,
      params: params,
    };
    return configObject;
  }

  function handleSubmit(event) {
    console.log("Event delete:" + event);
    let data = {
      collection: collection,
      field: field,
      integrationName: integrationName,
    };
    let configObejct = requestObject(
      "http://127.0.0.1:8081/firestore/",
      "delete",
      data
    );
    axios.request(configObejct).then((res) => {
      console.log("react1: ", res);
      console.log("react2: ", res.data);
      this.setState({ total: res.data });
    });
  }

  function handleSubmitCount(event) {
    console.log("...count...");
    var params = new URLSearchParams();
    params.append("collection", collection);
    params.append("field", field);
    params.append("integrationName", integrationName);
    var request = {
      params: params,
    };

    console.log("request 127.0.0.1:" + request);
    console.log("BACKEND_HOST:", process.env);
    axios.get(`http://127.0.0.1:8081/firestore/`, request).then((res) => {
      this.setState({ total: res.data });
    });
  }

  return (
    <span>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          name="collection"
          onChange={(e) => setCollection(e.target.value)}
          helperText="Collection"
          variant="outlined"
          required
          margin="dense"
        />
        <TextField
          name="field"
          onChange={(e) => setCollection(e.target.value)}
          helperText="Field"
          variant="outlined"
          required
          margin="dense"
        />

        <TextField
          name="value"
          onChange={(e) => setCollection(e.target.value)}
          helperText="Value"
          variant="outlined"
          required
          margin="dense"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e)}
          disableElevation
          type="button"
        >
          Delete Registers
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmitCount(e)}
          disableElevation
          type="button"
        >
          Count Registers
        </Button>

        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          {total}
        </Typography>
      </form>
    </span>
  );
}
