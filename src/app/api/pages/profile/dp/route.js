import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import "server-only";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("avatar");  // Ensure this key matches the frontend
        const userEmail = formData.get("userEmail");

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        // Convert the file to a buffer for Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await dbConnect();

        // Upload to Cloudinary using a Promise to wait for the result
        const cloudinaryResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                { folder: "profile_pictures" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        // Check if the Cloudinary result contains a secure URL
        if (!cloudinaryResult.secure_url) {
            throw new Error("Cloudinary did not return a secure URL");
        }

        // Update MongoDB with the Cloudinary URL
        const result = await User.updateOne(
            { email: userEmail },
            { $set: { profilePicUrl: cloudinaryResult.secure_url } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "User not found or not updated" }, { status: 500 });
        }

        return NextResponse.json({
            message: "Image uploaded successfully",
            url: cloudinaryResult.secure_url
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("vrfyImg");  // Ensure this key matches the frontend
        const userEmail = formData.get("userEmail");

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        // Convert the file to a buffer for Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a Promise to wait for the result
        const cloudinaryResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                { folder: "verify_pictures" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        // Check if the Cloudinary result contains a secure URL
        if (!cloudinaryResult.secure_url) {
            throw new Error("Cloudinary did not return a secure URL");
        }

        // Update MongoDB with the Cloudinary URL
        /* const result = await User.updateOne(
            { email: userEmail },
            { $set: { profilePicUrl: cloudinaryResult.secure_url } }
        ); */

        await dbConnect();

        const result = await User.updateOne(
            { email: userEmail },
            { $set: { "verification.verifyImgUrl": cloudinaryResult.secure_url } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "User not found or not updated" }, { status: 500 });
        }

        return NextResponse.json({
            message: "Image uploaded successfully",
            url: cloudinaryResult.secure_url
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
