import Link from "next/link"
// import Menu from "../menu"
// import { withAuth } from "../with-auth"
import styles from './styles.module.css'
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useQueries } from "@/hooks/useQueries"
import Cookies from "js-cookie"
import { useMutation } from "@/hooks/useMutation"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "@/context/userContext"

export default function Header() {
  const router = useRouter();
  const { mutate } = useMutation();
  // console.log("Cookiesnya => ", Cookies.get('user_token'))

  // jika menggunakan context maka data nya 
  const UserData = useContext(UserContext)

  // sebelum menggunakan statemanagement dengan Context kita harus memanggil api nya terlebih dahulu 
  // const { data } = useQueries({
  //   prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/user/me',
  //   headers: {
  //     'Authorization': `Bearer ${Cookies.get('user_token')}`
  //   }
  // })
  const HandleLogout = async () => {
    const response = await mutate({
      url: 'https://paace-f178cafcae7b.nevacloud.io/api/logout',
      method: "GET",
      headers: {
        'Authorization': `Bearer ${Cookies.get('user_token')}`
      }

    });
    // console.log('Response =>', response)
    if (!response?.success) {
      console.log('Gagal Logout');
    } else {
      Cookies.remove('user_token');
      router.push("/login")
    }
  }
  return (
    <div className={`flex ${styles.header}`}>
      <nav className={`flex flex-row gap-4`}>
        <div><Link href="/">Home</Link></div>
        <div><Link href="/profile">Profile</Link></div>
        <div><Link href="/users">Users</Link></div>
        <div><Link href="/notes">Notes</Link></div>
        <div><Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {UserData?.name}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
          </MenuList>
        </Menu></div>
      </nav>
    </div>
  )
}