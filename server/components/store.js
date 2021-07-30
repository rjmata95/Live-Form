const { Model } = require("mongoose");
const model = require("./models");

function storeData(data) {
  return new Promise((resolve, reject) => {
    const dataReadyToStore = new model(data);
    dataReadyToStore
      .save()
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        // console.error(`Error while storing data to db: ${err}`)
        reject(`Error in Store component: ${err}`);
      });
  });
}

function retrieveData() {
  return new Promise((resolve, reject) => {
    model.find().exec((err, result) => {
      if (err) {
        reject(`Error in Store component: ${err}`);
      } else resolve(result);
    });
  });
}

function removeData(data) {
  return new Promise((resolve, reject) => {
    model.deleteMany(
      {
        _id: {
          $in: data,
        },
      },
      (err, result) => {
        if (err) {
          reject(`Couldnt reach db, [error]: ${err}`);
        } else {
          resolve(result);
        }
      }
    );
  });
}

async function updateData(id, data) {
  const foundData = await model.findById(id);

  if (!foundData) return "ID not found";

  const modifiedData = Object.assign(foundData, data);
  const result = await modifiedData.save();
  return result;
}
module.exports = {
  storeData,
  retrieveData,
  removeData,
  updateData,
};
