import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Link from 'next/link';
import { APP_NAME } from '../config';
import { isAuth, signout } from '../actions/auth';
import { useRouter } from 'next/router';
import Search from './blog/Search';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSignout = () => {
    signout(() => {
      router.replace('/signin');
    });
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <Link href="/" passHref>
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/blogs" passHref>
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/contact" passHref>
                <NavLink>Contact</NavLink>
              </Link>
            </NavItem>
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href="/signin" passHref>
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup" passHref>
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {isAuth() && (
              <>
                <NavItem>
                  <Link
                    href={isAuth().role === 1 ? '/admin' : '/user'}
                    passHref
                  >
                    <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href={`/user/crud/blog`} passHref>
                    <NavLink className="btn btn-primary text-white">
                      Write a blog
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink onClick={handleSignout}>
                    <div style={{ cursor: 'pointer' }}>Signout</div>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </>
  );
};

export default Header;
