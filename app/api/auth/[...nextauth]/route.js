import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
// import { connectToDB } from "@utils/database";
import excuteQuery from "@utils/mysql";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })],
    callbacks: {
        async session({ session }) {
            const sessionUser = await excuteQuery({
                query: "SELECT * FROM users WHERE email=?",
                values: [session.user.email]
            })
            session.user.id = sessionUser[0].user_id
            return session
        },
        async signIn({ profile }) {
            try {
                const userExist = await excuteQuery({
                    query: "SELECT * FROM users WHERE email=? LIMIT 1",
                    values: [profile.email]
                })

                // if not, create new user
                if (!userExist.length) {
                    const result = await excuteQuery({
                        query: "INSERT INTO users (email,username,image) VALUES (?,?,?)",
                        values: [profile.email, profile.name.replace(" ", "").toLowerCase(), profile.picture]
                    })

                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    },
})
export { handler as GET, handler as POST }