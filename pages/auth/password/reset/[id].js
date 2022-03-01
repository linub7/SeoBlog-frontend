import { useRouter } from 'next/router';
import { useState } from 'react';
import { resetPassword } from '../../../../actions/auth';
import Layout from '../../../../components/Layout';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    message: '',
    error: '',
    showForm: true,
  });
  const { name, newPassword, message, error, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, message: '', error: '' });
    resetPassword({ newPassword, resetPasswordLink: router.query.id }).then(
      (data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            showForm: false,
            newPassword: '',
          });
        } else {
          setValues({
            ...values,
            message: data.message,
            newPassword: '',
            showForm: false,
            error: '',
          });
        }
      }
    );
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showMessage = () =>
    message && <div className="alert alert-success">{message}</div>;

  const passwordResetForm = () => (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            placeholder="Enter your New Password"
            type="password"
            value={newPassword}
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            required
            className="form-control"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <Layout>
      <div className="container">
        <h2>Reset Password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {showForm && passwordResetForm()}
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
