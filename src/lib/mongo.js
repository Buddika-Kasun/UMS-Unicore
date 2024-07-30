import { connect } from "mongoose";

export async function dbConnect() {
    try {
        const conn = await connect(String(process.env.MONGO_DB_CONNECTION_STRING));
        return conn;
    }
    catch(err) {
        throw new Error(err);
    }
}