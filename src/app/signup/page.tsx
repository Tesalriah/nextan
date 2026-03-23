'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const doSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            alert(error)
        } else {
            alert('회원가입 성공!')
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
            <button type="submit">회원가입</button>
        </form>
    )
}
