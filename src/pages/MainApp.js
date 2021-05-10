import React from "react";
import "./styles/MainApp.css";
import NavBar from "../components/NavBar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { v4 as uuid } from "uuid";
import formValidation from "../components/formValidation";

const formInitialState = {
  name: "",
  nameError: null,
  email: "",
  emailError: null,
  role: "",
  roleError: null,
  dob: "",
  dobError: null,
  gender: "",
  genderError: null,
};
class mainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      form: formInitialState,
      table: {
        submit: false,
        data: [
          // {
          //   name: "Raynulfo Mata",
          //   email: "rjmata95@gmail.com",
          //   role: "JrDev",
          //   dob: "12/19/1995",
          //   gender: "male",
          // },
        ],
      },
    };
  }

  componentDidMount() {
    // this.setState({
    //   loading: false,
    // });
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch("http://localhost:8080/table");
      const data = await response.json();
      this.setState({
        loading: false,
        table: { data: data.body },
      });

      console.log(data);
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
      console.log(`there's been an error: ${error}`);
    }
  };

  submitData = async (data) => {
    this.setState({ loading: true });
    try {
      const response = await fetch("http://localhost:8080/table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      this.setState({ loading: false });
      return Promise.resolve(response);
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
      console.log(`there was an Error during POST method: ${error}`);
      return Promise.reject(error);
    }
  };

  setNewEntries = () => {};

  formChange = (e) => {
    this.setState((state) => ({
      form: {
        ...state.form,
        [e.target.name]: e.target.value,
      },
    }));
  };
  formSubmitted = (e) => {
    e.preventDefault();
    //validate entries from this.state.form
    let state = this.state;
    this.setState((state) => {
      let nameError = formValidation.validateName(state.form.name);
      let emailError = formValidation.validateEmail(state.form.email);
      let roleError = formValidation.validateRole(state.form.role);
      let dobError = formValidation.validateDOB(state.form.dob);
      let genderError = formValidation.validateGender(state.form.gender);
      let newData;

      if (
        nameError === null &&
        emailError === null &&
        roleError === null &&
        dobError === null &&
        genderError === null
      ) {
        newData = state.table.data.concat({
          _id: uuid(),
          ...state.form,
        });
        this.submitData(newData)
          .then((response) => {
            console.log(response);
            return { form: formInitialState, table: { data: newData } };
          })
          .catch((error) => {
            console.log(error);
            return { form: formInitialState };
          });
      } else {
        return {
          form: { nameError, emailError, roleError, dobError, genderError },
        };
      }
    });

    //toggle submit to true (may not be necessary)
  };
  render() {
    return (
      <div className="green-bg">
        <NavBar />
        <div>
          <EmployeeForm
            onChange={this.formChange}
            formState={this.state.form}
            onSubmit={this.formSubmitted}
          />
        </div>
        <div>
          <EmployeeTable updateTable={this.state.table.data} />
        </div>
      </div>
    );
  }
}

export default mainApp;