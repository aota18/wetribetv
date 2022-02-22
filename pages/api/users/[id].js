const bcrypt = require("bcryptjs");

import { updateDoc } from "firebase/firestore";
import { omit } from "helpers/api/omit";
import { apiHandler } from "../../../helpers/api/api-handler";
import { usersRepo } from "../../../helpers/users-repo";

const getById = (req, res) => {
  const user = usersRepo.getById(req.query.id);

  if (!user) throw "User Not Found";

  return res.status(200).json(omit(user, "hash"));
};

const update = (req, res) => {
  const user = usersRepo.getById(req.query.id);

  if (!user) throw "User Not Found";

  // split out password from user details
  const { password, ...params } = req.body;

  // validate
  if (
    user.username !== params.username &&
    usersRepo.find((x) => x.username === params.username)
  )
    throw `User with the username "${params.username}" already exists`;

  // only update hashed password if entered
  if (password) {
    user.hash = bcrypt.hashSync(password, 10);
  }

  usersRepo.update(req.query.id, params);
  return res.status(200).json({});
};

const _delete = (req, res) => {
  usersRepo.delete(req.query.id);
  return res.status(200).json({});
};

export default apiHandler({
  get: getById,
  put: updateDoc,
  delete: _delete,
});
