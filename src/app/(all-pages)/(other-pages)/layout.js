"use server"

import { auth } from "@/app/api/auth/auth";
import CommonLayout from "@/components/layout/commonLayout";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { redirect } from "next/navigation";

const Layout = async({children}) => {

    const session = await auth();

    // Calculate the time left until the session expires
    const sessionExpiryTime = new Date(session.expires).getTime();
    const currentTime = new Date().getTime();
    const timeLeft = sessionExpiryTime - currentTime;

    if(!session?.user) {
        redirect("/authPages?mode=login");
    }

    const email = session.user.email;

    await dbConnect();

    const pic = await User.findOne({email: email}, {profilePicUrl: 1, _id:0});

    return (
        <CommonLayout sessionData={session?.user} sessionExpiry={timeLeft} userPic={pic}>
            {children}
        </CommonLayout>
    )
}

export default Layout;