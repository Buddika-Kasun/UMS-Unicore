"use server"

import { auth } from "@/app/api/auth/auth";
import Profile from "@/components/profileComp/Profile";
import { dbConnect } from "@/lib/mongo";
import { findUserByEmail } from "@/queries/users";

<<<<<<< HEAD
const profile = () => {
  return (
    <div className={style.container}>
      <div className={style.leftContainer}>a</div>
      <div className={style.rightContainer}>b</div>
    </div>
  )
=======
const profile = async() => {

  const session = await auth();

  const email = session.user.email;

  await dbConnect();

  const existingUser = await findUserByEmail(email);

   console.log(existingUser);

  const user = {
    firstName: existingUser.name,
    lastName: "",
    faculty: existingUser.faculty,
    email: existingUser.email,
    type: existingUser.type,
    role: existingUser.role,
    createdDate: existingUser.createdDate,
    loginDate: existingUser.loginDate,
    profilePicture: "Profile Picture", // You can replace this with an image URL
  };

  return <Profile user={user} />;
>>>>>>> e8cf2056862c9b3a29d214a48d75944aac1a4053
}

export default profile;