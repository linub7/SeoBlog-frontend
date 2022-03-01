import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { authenticate, isAuth, signin } from '../../actions/auth';
import Link from 'next/link';

const SigninComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  useEffect(() => {
    isAuth() && router.push(`/`);
  }, []);
  const { email, password, error, loading, message, showForm } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    setValues({ ...values, loading: true, error: false });
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localStorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            router.push(`/admin`);
          } else {
            router.push(`/user`);
          }
        });
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : '';

  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          value={email}
          type="email"
          onChange={handleChange('email')}
          placeholder="Enter your Email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          value={password}
          type="password"
          onChange={handleChange('password')}
          placeholder="Enter your Password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button disabled={!email || !password} className="btn btn-primary">
          Signup
        </button>
      </div>
    </form>
  );
  return (
    <>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signupForm()}
      <Link href="/auth/password/forgot">
        <a className="btn btn-sm btn-outline-warning">Forgot your Password?</a>
      </Link>
    </>
  );
};

export default SigninComponent;
