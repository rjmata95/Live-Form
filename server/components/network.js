const express = require("express");
const router = express.Router();
const controller = require("./controller");
const response = require("../network/response");

router.get("/", (req, res) => {
  controller
    .getEmployee()
    .then((internalMsg) => {
      response.success(req, res, internalMsg, 201);
    })
    .catch((internalMsg) => {
      response.error(req, res, "Internal Error, try again", 501, internalMsg);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  controller
    .addEmployee(req.body)
    .then((internalMsg) => {
      response.success(req, res, internalMsg, 201);
    })
    .catch((internalMsg) => {
      response.error(req, res, "Internal Error, try again", 501, internalMsg);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .removeEmployee(req.params.id)
    .then((internalMsg) => {
      response.success(req, res, internalMsg, 201);
    })
    .catch((internalMsg) => {
      response.error(req, res, "Internal Error, try again", 501, internalMsg);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateEmployee(req.params.id, req.body)
    .then((internalMsg) => {
      response.success(req, res, internalMsg, 201);
    })
    .catch((internalMsg) => {
      response.error(req, res, "Internal Error, try again", 501, internalMsg);
    });
});

module.exports = router;
