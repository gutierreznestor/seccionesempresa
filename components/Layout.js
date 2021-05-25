import Head from "next/head";

const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      {children}
    </main>
  </>
)

export default Layout;