"use server"

import VerifyFormComp from "@/components/verifiFormComp/VerifyFormComp";
import { User } from "@/model/user-model";

const verificationPage = async({ searchParams }) => {

    const { id } = searchParams || {};

    const user = await User.find(
        { _id: id},
        { 'verification.createDate': 1,'verification.type':1, 'verification.verifyImgUrl':1, faculty: 1, name: 1, type: 1, _id: 1 }
    ).lean();

    console.log(user)

    return (
        <VerifyFormComp reqUser={user[0]}/>
    );
}

export default verificationPage;