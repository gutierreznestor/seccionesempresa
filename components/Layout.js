import Head from "next/head";
import { StyledMain } from './Layout.styled';

import Navbar from "./Navbar/Navbar.component";

const Layout = ({ children, title, hideNavbar, user }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StyledMain>
      {!hideNavbar && <Navbar user={user} />}
      {children}
    </StyledMain>
  </>
)

export default Layout;