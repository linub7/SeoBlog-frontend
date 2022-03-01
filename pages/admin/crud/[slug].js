import Admin from '../../../components/auth/Admin';
import UpdateBlog from '../../../components/crud/UpdateBlog';
import Layout from '../../../components/Layout';

const UpdateSingleBlog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update Blog</h2>
            </div>
            <div className="col-md-12">
              <UpdateBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default UpdateSingleBlog;
