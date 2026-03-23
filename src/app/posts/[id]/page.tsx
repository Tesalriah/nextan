'use client'

import { supabase } from '@/app/lib/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
    id: number
    created_at: Date
    title: string
    content: string
}

interface Comment {
    id: number
    created_at: Date
    content: string
    post_id: number
}

export default function PostDetail() {
    const params = useParams()
    const { id } = params
    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        fetchData()
        fetchComments()
    }, [])

    const fetchData = async () => {
        const { data: post, error } = await supabase.from('table').select('*').eq('id', id).single()
        setPost(post)
    }

    const fetchComments = async () => {
        const { data: comments, error } = await supabase.from('comments').select('*').eq('post_id', id)
        setComments((comments as Comment[]) ?? [])
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
            <div className="p-2">
                댓글
                {comments.map((comment) => (
                    <div key={comment.id} className="p-3">
                        <div>{comment.content}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
