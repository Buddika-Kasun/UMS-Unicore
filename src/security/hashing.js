import bcrypt from "bcryptjs";

export function hash (value, salt = 5) {
    const hashedValue = bcrypt.hash(value, salt);
    return hashedValue;
}