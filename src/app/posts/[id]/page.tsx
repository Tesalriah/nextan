'use client'

import { supabase } from '@/app/lib/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
    id: number
    completed: boolean
    title: string
    content: string
}

export default function PostDetail() {
    const params = useParams()
    const { id } = params
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data: post, error } = await supabase.from('table').select('*').eq('id', id).single()
        setPost(post)
    }
    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                <div>id:{post.id}</div>
                <div>title:{post.title}</div>
                <div>body:{post.content}</div>
            </div>
        </>
    )
}
