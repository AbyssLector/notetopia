
import excuteQuery from "@utils/mysql"

export const GET = async (request, { params }) => {
    try {
        const notes = await excuteQuery({
            query: "SELECT * FROM notes JOIN users ON notes.user_id = users.user_id WHERE users.user_id = ?;",
            values: [params.id]
        })
        console.log()
        if (notes.length)
            return new Response(JSON.stringify(notes), { status: 200 })
        else
            return new Response(JSON.stringify([]), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('failed to fetch notes'), { status: 500 })
    }
}