"use server"

import { auth } from "@/app/api/auth/auth";
import Dashboard from "@/components/dashboard/Dashboard";
import UserTable from "@/components/dashboard/UserTable";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

const dashboard = async() => {

  await dbConnect();

  const user = await User.find({},{_id: 1, name: 1, role:1});

  //console.log("user = ", user.role);

  // const users = [
  //   { id: 1, name: 'John Doe', role: 'Admin' },
  //   { id: 2, name: 'Jane Smith', role: 'Staff' },
  //   { id: 3, name: 'Alice Brown', role: 'Student' },
  // ];

  const session = await auth();

  const role = session.user.role;

  //console.log("role = ", role);

  return (
    <>
    {/* <div>dashboard</div>

    <UserTable users1={user}/> */}
    {(role === 'Test' || role === 'System Admin') && <Dashboard user={user}/>}
    {(role === 'Guest') && <div>Please verify your user role in the profile page</div>}
    {!(role === 'Test' || role === 'System Admin') && <div>Your are verified {role}, Dashboard are under maintain...</div>}

    </>
  );
}

export default dashboard;