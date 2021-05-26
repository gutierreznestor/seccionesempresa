import Head from "next/head";
import { StyledMain } from './Layout.styled';

const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StyledMain>
      {children}
    </StyledMain>
  </>
)

export default Layout;