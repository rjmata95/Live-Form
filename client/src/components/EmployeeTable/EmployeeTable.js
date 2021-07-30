import React from "react";
import "./style.css";
import {
  FaTrashAlt,
  FaEdit,
  FaCheckCircle,
  FaWindowClose,
} from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import formValidation from "../EmployeeForm/formValidation";

const spinner = {
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};

const initialState = {
  editing: false,
  newValue: {
    _id: "",
    name: "",
    email: "",
    role: "",
    dob: "",
    gender: "",
  },
};

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    console.log("tBLE");
  }

  onClick(id) {
    console.log(id);
  }

  onChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({
      newValue: { ...this.state.newValue, [name]: value },
    });
  };

  onSubmitChange = async () => {
    //validate form
    const { _id, ...newValues } = this.state.newValue;
    //formValidation.validateEmployee(newValues)
    try {
      this.props.updateHandler({ loading: true });
      const response = await fetch(`http://192.168.1.17:8080/table/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues),
      });
      //implementar logica post succeess
      const parsedResponse = await response.json();
      let newTable = this.props.updateTable.filter(
        (element) => element._id !== this.state.newValue._id
      );
      this.props.updateHandler({
        loading: false,
        table: {
          data: [...newTable, { ...this.state.newValue }],
        },
      });
      this.setState(initialState);
    } catch (error) {
      this.props.updateHandler({ loading: false, error });
      console.log(`There was an error during Patch method: ${error}`);
      this.setState(initialState);
    }

    //send patch request
  };

  editing = (item) => {
    this.setState({ editing: true, newValue: { ...item } });
  };

  render() {
    return (
      <div className="container__component">
        <div className="container__table">
          {this.props.isLoading ? (
            <BeatLoader loading color={"#9090ff"} css={spinner} />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Role</th>
                  <th>DOB</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {this.props.updateTable.map((element) => {
                  if (this.state.editing) {
                    if (element._id === this.state.newValue._id) {
                      return (
                        <tr key={element._id} className="editable">
                          <td>
                            <input
                              name="name"
                              defaultValue={element.name}
                              onChange={this.onChange}
                              value={this.state.newValue.name}
                            />
                          </td>
                          <td>
                            <input
                              name="email"
                              defaultValue={element.email}
                              onChange={this.onChange}
                            />
                          </td>
                          <td>
                            <select
                              name="role"
                              defaultValue={element.role}
                              onChange={this.onChange}
                            >
                              <option value="">Select Your Role</option>
                              <option value="FDJr">
                                Front-end Developer Jr
                              </option>
                              <option value="FDSr">
                                Front-end Developer Sr
                              </option>
                              <option value="BDJr">
                                Back-end Developer Jr
                              </option>
                              <option value="BDSr">
                                Back-end Developer Sr
                              </option>
                              <option value="PM">Product Manager</option>
                              <option value="RA">Risks Analyst</option>
                              <option value="UID">UI Designer</option>
                              <option value="UXD">UX Designer</option>
                            </select>
                          </td>
                          <td>
                            <input
                              name="dob"
                              type="date"
                              defaultValue={element.dob}
                              onChange={this.onChange}
                            />
                          </td>
                          <td>
                            <select
                              name="gender"
                              defaultValue={element.gender}
                              onChange={this.onChange}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </td>
                          <td>
                            <FaCheckCircle
                              onClick={this.onSubmitChange}
                              className={"actionBtn"}
                            />
                          </td>
                          <td>
                            <FaWindowClose
                              onClick={() =>
                                this.setState({
                                  editing: false,
                                  editingID: "",
                                })
                              }
                              className={"actionBtn"}
                            />
                          </td>
                        </tr>
                      );
                    }
                  }

                  return (
                    <tr key={element._id}>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.role}</td>
                      <td>{element.dob}</td>
                      <td>{element.gender}</td>
                      <td>
                        <FaTrashAlt
                          onClick={() => this.props.deleteHandler(element._id)}
                          className={"actionBtn"}
                        />
                      </td>
                      <td>
                        <FaEdit
                          onClick={() => this.editing(element)}
                          className={"actionBtn"}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default EmployeeTable;
