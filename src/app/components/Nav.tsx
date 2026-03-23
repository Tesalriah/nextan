import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="flex gap-3">
            <Link href="/" className="p-3 hover:bg-gray-500">
                홈
            </Link>
            <Link href="/posts" className="p-3 hover:bg-gray-500">
                게시글 목록
            </Link>
            <Link href="/signup" className="p-3 hover:bg-gray-500">
                회원가입
            </Link>
            <Link href="/login" className="p-3 hover:bg-gray-500">
                로그인
            </Link>
        </nav>
    )
}
