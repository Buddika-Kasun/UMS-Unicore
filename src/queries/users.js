import { User } from "@/model/user-model";

export async function createUser(user) {
    try {
        await User.create(user);
    }
    catch(err) {
        throw new Error(err);
    }
}