import { useState } from 'react';
import { emailContactForm } from '../../actions/form';

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    buttonText: 'Send Email',
    error: false,
    success: false,
    sent: false,
  });
  const { name, email, message, buttonText, error, success, sent } = values;

  const submitHandler = (e) => {
    e.preventDefault();

    setValues({ ...values, buttonText: 'Sending...' });

    emailContactForm({ authorEmail, name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          message: '',
          email: '',
          success: data.success,
          sent: true,
          error: false,
          buttonText: 'Sent Successfully',
        });
      }
    });

    //
  };

  const inputChangeHandler = (name) => (e) => {
    const value = e.target.value;

    setValues({
      ...values,
      [name]: value,
      error: false,
      success: false,
      sent: false,
    });
  };

  const showContactForm = () => (
    <form onSubmit={submitHandler} className="pb-5">
      <div className="form-group">
        <label className="muted">Message</label>
        <textarea
          className="form-control"
          type="text"
          onChange={inputChangeHandler('message')}
          value={message}
          rows="10"
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label className="muted">Name</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={inputChangeHandler('name')}
          required
        />
      </div>

      <div className="form-group">
        <label className="muted">Email</label>
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={inputChangeHandler('email')}
          required
        />
      </div>
      <div>
        <button className="btn btn-primary">{buttonText}</button>
      </div>
    </form>
  );

  const showSuccess = () =>
    success && (
      <div className="alert alert-success">Thank you Contacting us.</div>
    );
  const showError = () =>
    error && <div className="alert alert-success">{error}</div>;

  return (
    <>
      {showSuccess()}
      {showError()}
      {showContactForm()}
    </>
  );
};

export default ContactForm;
