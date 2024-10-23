"use server"

import PendingUsersComp from "@/components/pendingUsersComp/PendingUsersComp";
import { Faculty } from "@/model/faculty-model";
import { User } from "@/model/user-model";

const PendingUserCreation = async() => {

  const facultys = await Faculty.find({}, { facultyName: 1, _id: 0 }).lean();
  const facultyNames = facultys.map(faculty => faculty.facultyName);

  const pendingUsers = await User.find({ 'verification.state': 'request' });
  console.log(pendingUsers);

  return (
      <PendingUsersComp facultys={facultyNames}/>
    );
};

export default PendingUserCreation;
