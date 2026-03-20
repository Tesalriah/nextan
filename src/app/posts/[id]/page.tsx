'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PostDetail() {
    const params = useParams()
    const { id } = params
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then((res) => res.json())
            .then((res) => setPosts([res]))
    }, [id])

    return (
        <>
            {posts.map((post) => (
                <div key={post.id}>
                    <div>id:{post.id}</div>
                    <div>title:{post.title}</div>
                    <div>body:{post.body}</div>
                </div>
            ))}
        </>
    )
}
