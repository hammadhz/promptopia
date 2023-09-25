import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectDB } from "@utils/db";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
           const sessionUser = await User.findOne({
            email: session.user.email
           })
    
           session.user.id = sessionUser._id.toString();
    
           return session;
        },
        async signIn({profile}) {
           try {
             await connectDB();
            //  check if a user alreay exists
             const UserExists = await User.findOne({
                email: profile.email
             })
    
            //  if not, create a new user
            if(!UserExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
    
            return true;
           } catch (error) {
            console.log(error)
           }     
        }
    },
})

export { handler as GET, handler as POST };