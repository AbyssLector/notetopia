'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const { data: session } = useSession()
    const [name, setName] = useState('-');
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async (userId) => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json()

            if (response.ok) {
                setPosts(data)
                if (id) {
                    const response2 = await fetch(`/api/users/${userId}`)
                    const data2 = await response2.json()

                    setName(data2[0].username)
                } else {
                    setName(session?.user.name)
                }
            }
            else {
                setError(true)
                setErrorMsg('invalid user id!')
            }
        }
        if (id) fetchPosts(id)
        else if (session?.user.id) {
            fetchPosts(session?.user.id)
        }

    }, [id, session?.user.id])
    const handleEdit = (post) => {
        router.push(`/update-note?id=${post.id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure want to delete?")
        if (hasConfirmed) {
            try {

                const response = await fetch(`/api/note/${post.id}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    const filteredPosts = posts.filter((p) => {
                        p.id !== post.id
                    })
                } else {
                    const res = await response.json()
                    alert(res)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            {error ? (
                <div className="w-full rounded-lg bg-red-500 text-white py-1 text-center border-2 border-gray-500">
                    {errorMsg}
                </div>
            ) : (<></>)}
            <Profile
                name={name}
                desc={id ? `Welcome to ${name} profile` : 'Welcome to your profile'}
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default MyProfile