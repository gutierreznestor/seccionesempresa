import { ConnectedRouter } from 'connected-next-router'
import { Wrapper } from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ConnectedRouter>
      <Component {...pageProps} />
    </ConnectedRouter>
  );
}


export default Wrapper.withRedux(MyApp);
