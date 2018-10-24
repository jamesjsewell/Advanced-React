import Link from 'next/link'
import NavStyles from './styles/NavStyles'

const Nav = () => (
  <NavStyles>
    <Link href='/'>
      <a>Home</a>
    </Link>

    <Link href='/sell'>
      <a>Sell</a>
    </Link>

    <Link href='/signup'>
      <a>Signup</a>
    </Link>

    <Link href='/orders'>
      <a>Orders</a>
    </Link>

    <Link href='/account'>
      <a>Me</a>
    </Link>

  </NavStyles>

)

export default Nav
