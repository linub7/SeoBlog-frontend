import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuth, signup } from '../../actions/auth';

const SignupComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
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

  const { name, email, password, error, loading, message, showForm } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password };
    setValues({ ...values, loading: true, error: false });
    signup(user).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          message: data.message,
          loading: false,
          showForm: false,
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
          value={name}
          type="text"
          onChange={handleChange('name')}
          placeholder="Enter your Name"
          className="form-control"
        />
      </div>
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
        <button
          disabled={!name || !email || !password}
          className="btn btn-primary"
        >
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
    </>
  );
};

export default SignupComponent;
