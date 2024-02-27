import Link from "next/link"
// import Menu from "../menu"
// import { withAuth } from "../with-auth"
import styles from './styles.module.css'

export default function Header() {
  return (
    <div className={`flex ${styles.header}`}>
      <nav className={`flex flex-row gap-4`}>
        <div><Link href="/">Home</Link></div>
        <div><Link href="/profile">Profile</Link></div>
        <div><Link href="/users">Users</Link></div>
      </nav>
    </div>
  )
}