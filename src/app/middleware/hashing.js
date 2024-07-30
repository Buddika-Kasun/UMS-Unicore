import bcrypt from "bcryptjs";

export function hash (value, salt) {
    const hashedValue = bcrypt.hash(value, salt);
    return hashedValue;
}