import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {config} from "dotenv";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});