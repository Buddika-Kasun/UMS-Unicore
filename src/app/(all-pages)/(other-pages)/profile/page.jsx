"use server"

import { auth } from "@/app/api/auth/auth";
import Profile from "@/components/profileComp/Profile";
import { dbConnect } from "@/lib/mongo";
import { findUserByEmail } from "@/queries/users";

const profile = async() => {

  const session = await auth();

  const email = session.user.email;

  await dbConnect();

  const existingUser = await findUserByEmail(email);

  //console.log(existingUser);

  const user = {
    firstName: existingUser.name,
    lastName: "",
    faculty: existingUser.faculty,
    email: existingUser.email,
    type: existingUser.type,
    role: existingUser.role,
    createdDate: existingUser.createdDate,
    loginDate: existingUser.loginDate,
    dp: existingUser.profilePicUrl,
    //vf: existingUser.verification.verifyImgUrl
    ...(existingUser.verification?.verifyImgUrl && { vf: existingUser.verification.verifyImgUrl })
  };

  return <Profile user={user}/>;

}

export default profile;