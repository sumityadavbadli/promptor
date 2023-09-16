import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database.mjs";
import User from "@models/user.mjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {

            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                //  check for user exists  in the db
                const userExists = await User.findOne({
                    email: profile.email
                })

                // If not then create new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
            }
        }
    }
});

export { handler as GET, handler as POST }