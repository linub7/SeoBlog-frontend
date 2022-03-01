import ContactForm from '../components/form/ContactForm';
import Layout from '../components/Layout';

export default function ContactPage() {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-offset-2">
            <h2>Contact Form</h2>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
