const isEmail = function (email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

function validateName(name) {
  name = name.trim();
  if (name === "") {
    return "Name is required";
  } else {
    return null;
  }
}
function validateEmail(email) {
  email = email.trim();
  if (email === "") {
    return "Email is required";
  } else if (!isEmail(email)) {
    return "Enter a valid Email";
  } else {
    return null;
  }
}

function validateRole(role) {
  if (role === "") {
    return "Role is required";
  } else {
    return null;
  }
}

function validateDOB(dob) {
  dob = dob.trim();
  if (dob === "") {
    return "Date of Birth is required";
  } else {
    let parts = dob.split("-");
    var dtDOB = new Date(parts[0], parts[1], parts[2]);
    var dtCurrent = new Date();
    if (
      80 < dtCurrent.getFullYear() - dtDOB.getFullYear() ||
      dtCurrent.getFullYear() - dtDOB.getFullYear() < 18
    ) {
      return "Enter a valid Date of Birth";
    } else {
      return null;
    }
  }
}

function validateGender(gender) {
  if (gender === "") {
    return "Gender is required";
  } else {
    return null;
  }
}

function validateEmployee(object) {
  let nameError = validateName(object.name);
  let emailError = validateEmail(object.email);
  let roleError = validateRole(object.role);
  let dobError = validateDOB(object.dob);
  let genderError = validateGender(object.gender);

  return {
    nameError: nameError || "",
    emailError: emailError || "",
    roleError: roleError || "",
    dobError: dobError || "",
    genderError: genderError || "",
  };
}

export default {
  validateDOB,
  validateRole,
  validateName,
  validateGender,
  validateEmail,
  validateEmployee,
};
