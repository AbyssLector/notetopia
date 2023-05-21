"use client";
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditNote = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const noteId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        text: "",
        tag: "",
        user_id: ''
    });

    useEffect(() => {
        const getNoteDetails = async () => {
            const response = await fetch(`/api/note/${noteId}`)
            const res = await response.json()
            if (response.ok) {
                const data = res[0]

                setPost({
                    text: data.text,
                    tag: data.tag,
                    user_id: data.user_id
                })
            } else {
                alert(res)
                router.push('/')
            }
        }
        if (noteId) getNoteDetails()
    }, [noteId])

    const updateNote = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!noteId) alert('missing note Id!')
        try {

            const response = await fetch(`api/note/${noteId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    text: post.text,
                    tag: post.tag,
                    userId: post.user_id,
                    sessionId: session?.user.id
                })
            })
            // const data = await response.json()
            if (response.ok)
                router.push('/')
            else {
                const res = await response.json()
                alert(res)
                router.push('/')

            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updateNote}
        />
    )
}

export default EditNote