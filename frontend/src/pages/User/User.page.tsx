import React, { FC } from "react";
import { Register, Users } from "../../components";

const UserPage: FC = () => {
  return (
    <div>
      <Register/>
      <Users/>
    </div>
  );
};

export { UserPage };