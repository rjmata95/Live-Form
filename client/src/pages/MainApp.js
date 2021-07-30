import React from "react";
import "./styles/MainApp.css";
import NavBar from "../components/NavBar/NavBar";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable/EmployeeTable";
import formValidation from "../components/EmployeeForm/formValidation";

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
      loading: false,
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
      const response = await fetch("http://192.168.1.17:8080/table");
      const data = await response.json();
      this.setState({
        loading: false,
        table: { data: data.body },
      });
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
      const response = await fetch("http://192.168.1.17:8080/table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      this.setState({ loading: false });
      let parsedResponse = await response.json();
      return Promise.resolve(parsedResponse.body);
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
      console.log(`there was an Error during POST method: ${error}`);
      return Promise.reject(error);
    }
  };

  deleteData = async (id) => {
    this.setState({ loading: true });
    try {
      const response = await fetch(`http://192.168.1.17:8080/table/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      });

      const parsedResponse = await response.json();
      if (response.status) {
        let updatedTable = [...this.state.table.data].filter(
          (element) => element._id !== id
        );
        console.log(parsedResponse);
        this.setState({ loading: false, table: { data: updatedTable } });
      } else {
        this.setState({ loading: false });
        throw "Server response status is set to Failure";
      }
    } catch (error) {
      console.log(`there was an Error during DELETE method: ${error}`);
      this.setState({ loading: false, error });
    }
  };

  formChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      let dobError = formValidation.validateDOB(value);
      this.setState((state) => ({
        form: {
          ...state.form,
          [name]: value,
          dobError,
        },
      }));
    } else {
      this.setState((state) => ({
        form: {
          ...state.form,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  formSubmitted = (e) => {
    e.preventDefault();
    //validate entries from this.state.form
    let state = this.state;

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
      this.submitData(state.form)
        .then((response) => {
          newData = state.table.data.concat({
            _id: response._id,
            ...state.form,
          });
          console.log(response);
          this.setState({ form: formInitialState, table: { data: newData } });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ form: formInitialState });
        });
    } else {
      console.log(state);
      this.setState((state) => ({
        form: {
          ...state.form,
          nameError,
          emailError,
          roleError,
          dobError,
          genderError,
        },
      }));
    }

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
          <EmployeeTable
            updateTable={this.state.table.data}
            deleteHandler={this.deleteData}
            isLoading={this.state.loading}
            updateHandler={(state) => this.setState(state)}
          />
        </div>
      </div>
    );
  }
}

export default mainApp;
