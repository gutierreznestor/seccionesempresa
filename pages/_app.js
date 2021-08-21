import { Wrapper } from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}


export default Wrapper.withRedux(MyApp);
