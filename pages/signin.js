import { useRouter } from 'next/router';
import SigninComponent from '../components/auth/SigninComponent';
import Layout from '../components/Layout';

const Signin = () => {
  const router = useRouter();

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert danger">{router.query.message}</div>;
    } else {
      return;
    }
  };
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signin</h2>
      <div className="row">
        <div className="col-md-6 offset-3">{showRedirectMessage()}</div>
        <div className="col-md-6 offset-3">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
