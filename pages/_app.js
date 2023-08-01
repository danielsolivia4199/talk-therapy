/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <AuthProvider>
        {' '}
        {/* gives children components access to user and auth methods */}
        <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
          component={Component}
          pageProps={pageProps}
        />
      </AuthProvider>
    </Container>
  );
}

export default MyApp;