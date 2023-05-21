import excuteQuery from "@utils/mysql"

export const POST = async (req, res) => {
    const { userId, text, tag } = await req.json()
    try {
        const result = await excuteQuery({
            query: "INSERT INTO notes (user_id, text, tag) VALUES (?,?,?)",
            values: [userId, text, tag]
        })
        return new Response("Success", {
            status: 201
        })
    } catch (error) {
        return new Response(JSON.stringify("Failed to create new Note"), {
            status: 500
        })
    }
}