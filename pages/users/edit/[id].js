import React, { useEffect, useState } from "react";
import { alertService } from "services/alert.service";
import { userService } from "services/user.service";
import Spinner from "../../../components/Spinner";
import AddEdit from "../../../components/users/AddEdit";
import Layout from "../../../components/users/Layout";

const Edit = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    userService
      .getById(id)
      .then((x) => setUser(x))
      .catch(alertService.error);
  }, []);

  return (
    <Layout>
      <h1>Edit User</h1>
      {user ? <AddEdit user={user} /> : <Spinner />}
    </Layout>
  );
};

export default Edit;

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
