import { apiHandler } from "../../../helpers/api/api-handler";
import { omit } from "../../../helpers/api/omit";
import { usersRepo } from "../../../helpers/users-repo";

const getUsers = (req, res) => {
  // return users without hashed passwords in the response
  const response = usersRepo.getAll().map((x) => omit(x, "hash"));
  return res.status(200).json(response);
};

export default apiHandler({
  get: getUsers,
});
