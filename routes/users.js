
const express = require("express");
const router = express.Router();

const users = require("../store/usersList");

router.get("", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;

  if (userId) {
    const selectedUser = users.filter(
      (user) => user["id"] === parseInt(userId)
    );

    if (selectedUser) {
      res.json(selectedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
});

router.post("", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = {
    id: users.length + 1,
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  users.push(newUser);
  res.json(newUser);
});

router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password } = req.body;
  if (userId) {
    const selectedUser = users.find((user) => user["id"] === parseInt(userId));
    if (selectedUser) {
      if (firstName) {
        selectedUser["first_name"] = firstName;
      }
      if (lastName) {
        selectedUser["last_name"] = lastName;
      }
      if (email) {
        selectedUser["email"] = email;
      }
      if (password) {
        selectedUser["password"] = password;
      }

      res.status(201).json(selectedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
});

module.exports = router;
