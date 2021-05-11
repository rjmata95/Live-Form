import React from "react";
import "./styles/EmployeeForm.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.printState = this.printState.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  printState() {
    console.log(this.state);
  }
  resetState = () => {
    this.setState((state) => {
      Object.keys(state).map((keys, i) => {
        state[keys] = "";
        return null;
      });
      return state;
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.printState();
  };

  render() {
    return (
      <form className="employeeForm" onSubmit={this.props.onSubmit}>
        <div className="row ">
          <label htmlFor="name">Name:</label>
          <input
            onChange={this.props.onChange}
            type="text"
            name="name"
            value={this.props.formState.name}
          />
        </div>
        {this.props.formState.nameError && (
          <p>{this.props.formState.nameError}</p>
        )}
        <div className="row ">
          <label htmlFor="email">E-mail:</label>
          <input
            onChange={this.props.onChange}
            type="text"
            name="email"
            value={this.props.formState.email}
          />
        </div>
        {this.props.formState.emailError && (
          <p>{this.props.formState.emailError}</p>
        )}
        <div className="row ">
          <label>Role:</label>
          <select
            onChange={this.props.onChange}
            name="role"
            value={this.props.formState.role}
          >
            <option value="">Select Your Role</option>
            <option value="FDJr">Front-end Developer Jr</option>
            <option value="FDSr">Front-end Developer Sr</option>
            <option value="BDJr">Back-end Developer Jr</option>
            <option value="BDSr">Back-end Developer Sr</option>
            <option value="PM">Product Manager</option>
            <option value="RA">Risks Analyst</option>
            <option value="UID">UI Designer</option>
            <option value="UXD">UX Designer</option>
          </select>
        </div>
        {this.props.formState.roleError && (
          <p>{this.props.formState.roleError}</p>
        )}
        <div className="row ">
          <label>DOB:</label>
          <input
            onChange={this.props.onChange}
            type="date"
            name="dob"
            value={this.props.formState.dob}
          />
        </div>
        {this.props.formState.dobError && (
          <p>{this.props.formState.dobError}</p>
        )}
        <div className="row ">
          <span>Gender:</span>
          <label className="row nowrap">
            Male
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={this.props.onChange}
              checked={this.props.formState.gender === "male"}
            />
          </label>
          <label className="row nowrap">
            Female
            <input
              type="radio"
              onChange={this.props.onChange}
              checked={this.props.formState.gender === "female"}
              name="gender"
              value="female"
            />
          </label>
          <label className="row nowrap">
            Other
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={this.props.onChange}
              checked={this.props.formState.gender === "other"}
            />
          </label>
        </div>
        {this.props.formState.genderError && (
          <p>{this.props.formState.genderError}</p>
        )}
        <div className="row centered">
          <button>Submit</button>
          <button
            type="button"
            style={{ marginLeft: "2em" }}
            onClick={this.printState}
          >
            Print State
          </button>
          <button
            type="button"
            style={{ marginLeft: "2em" }}
            onClick={this.resetState}
          >
            reset State
          </button>
        </div>
      </form>
    );
  }
}

export default EmployeeForm;
