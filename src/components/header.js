/**old but gold
 </h1>
      <FirebaseContext.Consumer>
      {props => {
        console.log(props);
        return <div />
      }}
      </FirebaseContext.Consumer>

      ---
      <h1 style={{ margin: 0, flexGrow: 1 }}>
 */
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, {useContext} from "react"
import {FirebaseContext} from './Firebase'
import styled from 'styled-components'

const LogoutLink = styled.span`
color: #fff;
cursor:pointer;
&:hover{
  text-decoration: underline;
}

`;

const HeaderWrapper = styled.header`
      /* background: rebeccapurple; */
      background: #000;
      margin-bottom: 1.45rem;
`;

const HeaderContent = styled.div`
        margin: 0 auto;
        max-width: 960;
        padding: 1.45rem 1.0875rem;
        display: flex;

        /* direct child */
        >h1{
          margin: 0;
          flex-grow: 1;

          >a{
            color: white;
            text-decoration: none;
          }
        }
        >div{
            margin: auto 0;

          }
`;

const UserInfo = styled.div`
text-align: right;
color: #fff;
`;

const LoginLink = styled.div`
margin: auto 0;
a{
  color: white;
}
`;

const Divider = styled.span`
margin: 0 8px;
padding-right: 1px;
background: #ddd; 
`;

const AdminLink = styled.span`
a{
  color: #fff;
}

`;

const Header = ({ siteTitle }) => {
  //using hooks
  const {firebase,user} = useContext(FirebaseContext);
  console.log(user);

  function handleLogoutClick(){
    //because its promise we can add then.. ::with then we will be able to navigate back to login page
    firebase.logout().then(() => navigate('/login'));
  }

  return(
  <HeaderWrapper>
    <HeaderContent>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
      <div>
        {!!user && !!user.email &&
        <UserInfo>
        hello, {user.username || user.email}
        <div>
        {!!user.isAdmin &&
       <>
       <AdminLink>
          <Link to="/add-author">
         Add Author
         </Link>
         </AdminLink>
         <Divider />
         <AdminLink>
         <Link to="/add-note">
         Add Note
         </Link>
         </AdminLink>
         <Divider />
        </>
        }
          <LogoutLink onClick={handleLogoutClick}>
          logout</LogoutLink>
        </div>
        </UserInfo>
        }
        {/*logic*/} 
        {(!user || !user.email) &&
        <LoginLink>
          <Link to="/login">
          Login
          </Link>
          <Divider />
           <Link to="/register">
          Register
          </Link>
        </LoginLink>
      }
      </div>
    </HeaderContent>
  </HeaderWrapper>
 )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
