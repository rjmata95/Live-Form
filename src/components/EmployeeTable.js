import React from "react";
import "./styles/EmployeeTable.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

class EmployeeTable extends React.Component {
  componentDidMount() {
    console.log("tBLE");
  }

  render() {
    return (
      <div className="container__component">
        <div className="container__table">
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
                return (
                  <tr key={element._id}>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.role}</td>
                    <td>{element.dob}</td>
                    <td>{element.gender}</td>
                    <td>
                      <FaTrashAlt />
                    </td>
                    <td>
                      <FaEdit />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeTable;
