import {createAccountAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import "./Register.sass";

const yup = require("yup");

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            firstNameMessage: 0,
            lastNameMessage: 0,
            emailMessage: 0,
            passwordMessage: 0,
        };
        this.checkPasswordValidity = this.checkPasswordValidity.bind(this);
        this.checkEmailValidity = this.checkEmailValidity.bind(this);
        this.checkFNameValidity = this.checkFNameValidity.bind(this);
        this.checkLNameValidity = this.checkLNameValidity.bind(this);
    }

    render() {
        return (<div className="Register-Home">
                <div className={"register"}>
                    <label>Create an Account</label>
                </div>
                <div className={"input-label"}>
                    <label htmlFor={"name"}>FIRST NAME</label>
                    <input autoComplete="off" id={"firstName"}
                           onChange={this.checkFNameValidity}
                           value={this.state.firstName}
                           className={this.state.firstNameMessage === "" || this.state.firstNameMessage === 0 ?
                               "Register-input-valid" :
                               "Register-input-invalid"}
                    >

                    </input>
                    <label className={"message"}>{this.state.firstNameMessage === 0 ? "" : this.state.firstNameMessage}</label>
                </div>
                <div className={"input-label"}>
                    <label htmlFor={"lastName"}>LAST NAME</label>
                    <input autoComplete="off" id={"lastName"}
                           onChange={this.checkLNameValidity}
                           value={this.state.lastName}
                           className={this.state.lastNameMessage === "" || this.state.lastNameMessage === 0 ?
                               "Register-input-valid" :
                               "Register-input-invalid"}
                    >

                    </input>
                    <label className={"message"}>{this.state.lastNameMessage === 0 ? "" : this.state.lastNameMessage}</label>
                </div>
                <div className={"input-label"}>
                    <label htmlFor={"email"}>EMAIL ADDRESS</label>
                    <input type={"email"} autoComplete="off" id={"email"}
                           onChange={this.checkEmailValidity}
                           value={this.state.email}
                           className={this.state.emailMessage === "" || this.state.emailMessage === 0 ?
                               "Register-input-valid" :
                               "Register-input-invalid"}
                    >

                    </input>
                    <label className={"message"}>{this.state.emailMessage === 0 ? "" : this.state.emailMessage}</label>
                </div>
                <div className={"input-label"}>
                    <label htmlFor={"password"}>PASSWORD</label>
                    <input type={"password"} autoComplete="off" id={"password"}
                           onChange={this.checkPasswordValidity}
                           value={this.state.password}
                           className={(this.state.passwordMessage === "" || this.state.passwordMessage === 0) ?
                               "Register-input-valid" :
                               "Register-input-invalid"}
                    >
                    </input>
                    <label className={"message"}>{this.state.passwordMessage === 0 ? "" : this.state.passwordMessage}</label>
                </div>
                <button onClick={() => this.props.createAccount({...this.state})}
                className={(this.state.firstNameMessage === "" &&
                this.state.lastNameMessage === "" &&
                this.state.emailMessage === "" &&
                this.state.passwordMessage === "") ? "Register-button" : "button"}>CREATE ACCOUNT</button>
            </div>
        );
    }

    checkFNameValidity(e) {
        const {value} = e.target;
        yup.object().shape({
            firstName: yup.string()
                .min(1)
                .matches(/[A-Za-z]/, () => {throw new Error("Invalid first name")})
                .trim()
        })
            .isValid({firstName: value})
            .then(() => {
                    this.setState({firstName: value, firstNameMessage: ""})
            })
            .catch(err => this.setState({firstName: value, firstNameMessage: err.message}));
    }

    checkLNameValidity(e) {
        const {value} = e.target;
        yup.object().shape({
            lastName: yup.string()
                .min(1)
                .matches(/[A-Za-z]/, () => {throw new Error("Invalid last name")})
                .trim()
        })
            .isValid({lastName: value})
            .then(() => {
                    this.setState({lastName: value, lastNameMessage: ""})
            })
            .catch(err => this.setState({lastName: value, lastNameMessage: err.message}));
    }

    checkEmailValidity(e) {
        const {value} = e.target;
        yup.object().shape({
            email: yup.string()
                .email(() => {throw new Error("Invalid email")})
                .min(1)
                .trim()
        })
            .isValid({email: value})
            .then(() => {
                this.setState({email: value, emailMessage: ""})
            })
            .catch(err => this.setState({email: value, emailMessage: err.message}));
    }

    checkPasswordValidity(e) {
        const {value} = e.target;
        yup.object().shape({
            password: yup.string()
                .min(8, () => {throw new Error("Password must contain at least 8 characters")})
                .max(32, () => {throw new Error("Password must contain maximum 32 characters")})
                .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/, () => {throw new Error("Password must contain upper and lower case letters and numbers")})
                .matches(/^\S+$/, () => {throw new Error("Password mustn't contain spaces")})

        })
            .isValid({password: value})
            .then(() => {
                    this.setState({password: value, passwordMessage: ""})
            })
            .catch(err => this.setState({password: value, passwordMessage: err.message}));
    }
}

const mapDispatchToProps = (dispatch) => ({
    createAccount: (data) => dispatch(createAccountAction(data))
});

export default connect(null, mapDispatchToProps)(Register);
