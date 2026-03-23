'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Post {
    id: number
    created_at: Date
    title: string
    content: string
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data: posts, error } = await supabase.from('table').select('*').order('id', { ascending: true })
        setPosts((posts as Post[]) ?? [])
        console.log(posts)
    }

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                        {post.id}.&nbsp;{post.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
