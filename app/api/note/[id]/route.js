import excuteQuery from "@utils/mysql"

export const GET = async (request, { params }) => {
    try {
        const note = await excuteQuery({
            query: "SELECT * FROM notes WHERE id=?",
            values: [params.id]
        })
        if (!note.length)
            return new Response(JSON.stringify('Note not found!'), { status: 404 })
        return new Response(JSON.stringify(note), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify('failed to fetch note'), { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { text, tag, userId, sessionId } = await request.json()
    if (userId != sessionId)
        return new Response(JSON.stringify("Forbidden"), { status: 404 })
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM notes WHERE id=? LIMIT 1",
            values: [params.id]
        })
        if (!result.length)
            return new Response(JSON.stringify('No prompt exist'), { status: 404 })
        const existingNote = result[0]
        existingNote.text = text
        existingNote.tag = tag
        const result2 = await excuteQuery({
            query: "UPDATE notes SET text=?, tag=? WHERE id=?",
            values: [text, tag, params.id]
        })
        return new Response(JSON.stringify(existingNote), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify('failed to update note'), { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    // const { userId, sessionId } = await request.json()
    console.log(params.id)
    // if (userId != sessionId)
    //     return new Response(JSON.stringify("Forbidden"), { status: 404 })
    try {
        const result = await excuteQuery({
            query: "DELETE FROM notes WHERE id=?",
            values: [params.id]
        })
        return new Response(JSON.stringify('note deleted successfully'), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify('failed to delete prompt'), { status: 500 })
    }
}