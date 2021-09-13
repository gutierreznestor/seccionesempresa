import Head from "next/head";
import { StyledMain } from './Layout.styled';

import Navbar from "./Navbar/Navbar.component";

const Layout = ({ children, title, hideNavbar, user, h1Title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StyledMain>
      {!hideNavbar && <Navbar user={user} />}
      {h1Title && <h1>{h1Title}</h1>}
      {children}
    </StyledMain>
  </>
)

export default Layout;