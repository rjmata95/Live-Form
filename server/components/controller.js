const { response } = require("express");
const store = require("./store");

function addEmployee(data) {
  return new Promise((resolve, reject) => {
    if (data) {
      store
        .storeData(data)
        .then((msg) => {
          resolve({ _id: msg._id });
        })
        .catch((err) => {
          reject(err);
        });
    } else reject("Error in Controller");
  });
}

function getEmployee() {
  return new Promise((resolve, reject) => {
    store
      .retrieveData()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function removeEmployee(id) {
  return new Promise((resolve, reject) => {
    store
      .removeData(id)
      .then((response) => {
        console.log(response);
        if (response.ok === 1) resolve(`Delete Succesfuly performed`);
        else reject("didnt receive ok from DB delete process");
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateEmployee(id, data) {
  return new Promise(async (resolve, reject) => {
    if (!id || !data) {
      reject("There's no sufficient data to perform Update");
      return false;
    }
    const result = await store.updateData(id, data);
    resolve(result);
  });
}

module.exports = {
  addEmployee,
  getEmployee,
  removeEmployee,
  updateEmployee,
};
