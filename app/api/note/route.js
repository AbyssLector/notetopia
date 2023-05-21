import excuteQuery from "@utils/mysql"

export const GET = async (request) => {
    try {
        const notes = await excuteQuery({
            query: "SELECT * FROM notes JOIN users ON notes.user_id = users.user_id;",
            values: null
        })
        return new Response(JSON.stringify(notes), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('failed to fetch notes'), { status: 500 })
    }
}