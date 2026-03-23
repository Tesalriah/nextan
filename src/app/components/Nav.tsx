'use client'

import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Nav() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getUser = async () => {
            fetchUser()
        }
        getUser()

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
        })

        return () => data.subscription.unsubscribe()
    }, [])

    const fetchUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
        console.log(user)
    }

    const router = useRouter()

    const doLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            alert(error)
        } else {
            alert('로그아웃 성공!')
            router.push('/login')
        }
    }

    return (
        <nav className="flex gap-3">
            <Link href="/" className="p-3 hover:bg-gray-500">
                홈
            </Link>
            <Link href="/posts" className="p-3 hover:bg-gray-500">
                게시글 목록
            </Link>
            {user ? (
                <>
                    <span>{user.email}님 반갑습니다.</span>
                    <button onClick={doLogout} className="p-3 hover:bg-gray-500 cursor-pointer">
                        로그아웃
                    </button>
                </>
            ) : (
                <>
                    <Link href="/signup" className="p-3 hover:bg-gray-500">
                        회원가입
                    </Link>
                    <Link href="/login" className="p-3 hover:bg-gray-500">
                        로그인
                    </Link>
                </>
            )}
        </nav>
    )
}
