'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const doSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, password)

        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            alert(error)
        } else {
            alert('로그인 성공!')
        }
    }

    return (
        <form onSubmit={doSubmit}>
            <div>
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">로그인</button>
        </form>
    )
}
