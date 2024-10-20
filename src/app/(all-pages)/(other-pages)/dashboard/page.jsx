"use server"

import UserTable from "@/components/userTableComp/UserTable";
import styles from "./dashboard.module.css";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

const dashboard = async() => {

  await dbConnect();

  const user = await User.find({},{_id: 1, name: 1, role:1});

  // console.log("user = ", user);

  // const users = [
  //   { id: 1, name: 'John Doe', role: 'Admin' },
  //   { id: 2, name: 'Jane Smith', role: 'Staff' },
  //   { id: 3, name: 'Alice Brown', role: 'Student' },
  // ];

  return (
    <>
    <div>dashboard</div>

    <UserTable users1={user}/>

    </>
  );
}

export default dashboard;