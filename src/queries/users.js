import "server-only";

//import { User } from "@/model/user-model";    // DB

export async function createUser(user) {
    try {
        await User.create(user);
        console.log("User created successfully.");
    }
    catch(err) {
        console.error("Error creating user:", err);
        throw new Error(err);
    }
}

const us = [
    {
        name: 'Test',
        faculty: 'test',
        type: 'a',
        email: 'test@gmail.com',
        pw: 'test1234',
        role: 'Test'
    },
    {
        name: 'System Admin',
        faculty: 'test',
        type: 'a',
        email: 'systemadmin@gmail.com',
        pw: 'systemAdmin1234',
        role: 'System Admin'
    },
    {
        name: 'Staff',
        faculty: 'test',
        type: 'a',
        email: 'staff@gmail.com',
        pw: 'staff1234',
        role: 'Staff'
    },
    {
        name: 'Administrators',
        faculty: 'test',
        type: 'a',
        email: 'administrators@gmail.com',
        pw: 'admin1234',
        role: 'Administrators'
    }
];                                     // DB

export /*async*/ function findUserByEmail(email) {
    try {
        //const user = await User.findOne({ email: email }).exec(); // Use .exec() for better error handling
        //return user; // Will return null if no user is found
        const user = us.find(user => user.email === email);
        return user || null;
    } catch (err) {
        console.error("Error finding user by email:", err);
        throw new Error(err);
    }
}