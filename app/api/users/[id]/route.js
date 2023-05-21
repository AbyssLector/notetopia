
import excuteQuery from "@utils/mysql"

export const GET = async (request, { params }) => {
    try {
        const user = await excuteQuery({
            query: "SELECT * FROM users WHERE user_id=?",
            values: [params.id]
        })
        if (!user.length)
            return new Response('No user found', { status: 400 })
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('failed to fetch user'), { status: 500 })
    }
}