import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",

    flexFlow: "column wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  section: {
    display: "flex",
    flexFlow: "row wrap"
  }
});

class OutlinedTextFields extends React.Component {
  state = { name: "", email: "", picture: "", post: "" };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };
  handlePostChange = event => {
    this.setState({
      post: event.target.value
    });
  };

  fileSelecedHandler = event => {
    console.log(event.target.files);
    this.setState({
      picture: event.target.files[0]
    });
  };

  fileUploadHandler = () => {
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    let fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("email", this.state.email);
    fd.append("PostImage", this.state.picture);
    fd.append("post", this.state.post);

    axios
      .post("http://blog.crunchycode.me:3000/api/posts/", fd, config)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(res => {
        return console.log(res);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          onChange={this.handleEmailChange}
          required="true"
        />
        <TextField
          id="outlined-email-input"
          label="full name"
          className={classes.textField}
          type="full name"
          name="name"
          autoComplete="name"
          margin="normal"
          variant="outlined"
          onChange={this.handleNameChange}
          required="true"
        />
        <TextField
          id="outlined-multiline-static"
          label="Post"
          multiline
          rows="4"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handlePostChange}
          required="true"
        />
        <section>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={this.fileSelecedHandler}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
              required="true"
            >
              Upload Image File
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
          </label>

          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={this.fileUploadHandler}
          >
            Post
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </section>
      </form>
    );
  }
}

export default withStyles(styles)(OutlinedTextFields);
