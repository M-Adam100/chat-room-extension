import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ProgressButton from "../../ProgressButton";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../../../App.css';

import { completeRegister, registerAccount } from "../../../actions/auth";
import CustomFormikField from "./../../../utils/formik/CustomFormikField";
import registerSchema from "./../../../utils/formik/registerSchema";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Container } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    padding: 0,
  },
  textfield: {
    borderWidth: "1px",
    borderColor: "white !important",
    borderRadius: '10px'
  }
}));

const RegisterForm = ({ registerAccount, currentUser, handleNext }) => {
  const classes = useStyles();
  const history = useHistory();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordInputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setPasswordVisibility(!passwordVisibility)}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {passwordVisibility ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
    classes: {
      notchedOutline: classes.textfield
    }

  };

  useEffect(() => {
    if (currentUser) {
      handleNext();
    }
  }, [currentUser]);

  return (
    <>
      <Container className={classes.titleContainer}>
        <DialogTitle className={classes.title} id="form-dialog-title">
          Register a Dazn Chat account
        </DialogTitle>
        <Link component={RouterLink} to="/login">
          Already have an account?
        </Link>
      </Container>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={registerSchema}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          registerAccount(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <CustomFormikField
            autoFocus
            fullWidth
            margin="dense"
            label="Username"
            name="username"
            type="text"
            placeholder="Username"
            InputProps={{
              classes: {
                notchedOutline: classes.textfield
              }
            }}
          />

          <CustomFormikField
            fullWidth
            margin="dense"
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            InputProps={{
              classes: {
                notchedOutline: classes.textfield
              }
            }}
          />
          <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>


          <CustomFormikField
            fullWidth
            margin="dense"
            label="Password"
            name="password"
            placeholder="Password"
            type={passwordVisibility ? "text" : "password"}
            InputProps={passwordInputProps}
          />

          <CustomFormikField
            fullWidth
            margin="dense"
            label="Confirm Password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            type={passwordVisibility ? "text" : "password"}
            InputProps={passwordInputProps}
          />

          <Button
            variant="contained"
            style={{ background: 'linear-gradient(93deg, #5D5FEF 0%, #0003FF 100%)' }}
            type="submit"
          >
            Register
          </Button>

        </Form>
      </Formik>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, { registerAccount })(RegisterForm);
