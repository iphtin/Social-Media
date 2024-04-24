import User from "@models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDB } from "@db";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                  await connectToDB();
                  const user = await User.findOne({ email })
                  .populate('following', '_id profileImage username')
                  .populate('follow', '_id profileImage username');
        
                  if (!user) {
                    return null;
                  }
        
        
                  const passwordsMatch = await compare(password, user.password);
        
                  if (!passwordsMatch) {
                    return null;
                  }
        
                  return {
                    id: user._id.toString(),
                    ...user._doc,
                  }
        
                } catch (error) {
                  console.log("Error: ", error);
                  return null;
                }
            }
        })
    ],
    callbacks: {
      async session({session}) {
        const mongodbUser = await User.findOne({ email: session.user.email })
        .populate('following', '_id profileImage username')
        .populate('follow', '_id profileImage username');
        session.user.id = mongodbUser._id.toString()
  
        session.user = {...session.user, ...mongodbUser._doc}
  
        return session
      }
    },
      secret: process.env.NEXTAUTH_SECRET,
      session: {
        strategy: "jwt",
      }, 
});

export { handler as GET, handler as POST };