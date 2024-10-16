import { auth } from "@/app/api/auth/auth";
import CommonLayout from "@/components/layout/commonLayout";
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

    return (
        <CommonLayout children={children} sessionData={session?.user} sessionExpiry={timeLeft}/>
    )
}

export default Layout;