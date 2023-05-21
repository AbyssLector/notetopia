'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import NoteCard from './PromptCard';

const NoteCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout '>
            {data.map((p) => (
                <NoteCard
                    key={p.id}
                    post={p}
                    handleTagClick={handleTagClick}

                />
            ))}
        </div>
    )
}


const Feed = () => {
    const route = useRouter()
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedResult, setSearchedResult] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const fetchPosts = async () => {
        const response = await fetch('/api/note')
        const data = await response.json()
        setAllPosts(data)
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    const filterNotes = (text) => {
        const regex = new RegExp(text, 'i')
        return allPosts.filter((i) =>
            regex.test(i.username) ||
            regex.test(i.tag) ||
            regex.test(i.text)
        )
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterNotes(searchText)
                setSearchedResult(searchResult)
            }, 500)
        )
    }
    const handleTagClick = (tag) => {
        setSearchText(tag)
        const searchedResult = filterNotes(tag)
        setSearchedResult(searchedResult)
    }

    return (
        <section className='feed'>
            <div className='w-full flex justify-between gap-2'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </div>
            {searchText ? (
                <NoteCardList
                    data={searchedResult}
                    handleTagClick={handleTagClick}

                />
            ) : (
                <NoteCardList
                    data={allPosts}
                    handleTagClick={handleTagClick}

                />
            )}
        </section>
    )
}

export default Feed