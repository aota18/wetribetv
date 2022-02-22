const fs = require("fs");

// users in JSON file for simplicity, store in a db for production applications
let users = require("../data/users.json");

const create = (user) => {
  // Generate new user id
  user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;

  // setdate created and updated
  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();

  //add and save user
  users.push(user);
  saveData();
};

const update = (id, params) => {
  const user = users.find((x) => x.id.toString() === id.toString());

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
  saveData();
};

const _delete = (id) => {
  // FIlter out deleted user and save
  users = users.filter((x) => x.id.toString() !== id.toString());
  saveData();
};

// Private helper function
const saveData = () => {
  console.log(__dirname);
  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));
};

export const usersRepo = {
  getAll: () => users,
  getById: (id) => users.find((x) => x.id.toString() === id.toString()),
  find: (x) => users.find(x),
  create,
  update,
  delete: _delete,
};
