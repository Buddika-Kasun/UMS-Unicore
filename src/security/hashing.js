import "server-only";

import bcrypt from "bcryptjs";

const salt = parseInt(process.env.HASH_SALT);

export function hash (value) {
    const hashedValue = bcrypt.hash(value, salt);
    return hashedValue;
}