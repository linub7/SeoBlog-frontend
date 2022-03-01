import { forgotPassword } from '../../../actions/auth';
import Layout from '../../../components/Layout';
import { useState } from 'react';

const ForgotPasswordPage = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });
  const { email, message, error, showForm } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, message: '', error: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, message: '', error: '' });
    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: '',
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showMessage = () =>
    message && <div className="alert alert-success">{message}</div>;

  const passwordForgotForm = () => (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={handleChange('email')}
            required
            className="form-control"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <Layout>
      <div className="container">
        <h2>Forgot Password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
