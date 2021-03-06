import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'

const Nav = () => (
  
  <User>
    {({data: {me} }) => (
    <NavStyles>
      <Link href='/'>
        <a>Shop</a>
      </Link>
      {me && (
        <>
        <Link href='/sell'>
          <a>Sell</a>
        </Link>

        <Link href='/orders'>
          <a>Orders</a>
        </Link>

        <Link href='/account'>
          <a>Me</a>
        </Link>
        </>
      )}
      {!me && (

        <Link href='/signup'>
        <a>Sign In</a>
        </Link>

      )}

    </NavStyles>)}
  </User>
  

)

export default Nav
