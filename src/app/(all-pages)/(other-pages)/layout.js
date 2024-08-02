import { auth } from "@/app/api/auth/auth";
import CommonLayout from "@/components/layout/commonLayout";
import { redirect } from "next/navigation";

const Layout = async({children}) => {

    const session = await auth();

    if(!session?.user) {
        redirect("/authPages?mode=login");
    }

    return (
        <CommonLayout children={children} sessionData={session?.user?.name} />
    )
}

export default Layout;