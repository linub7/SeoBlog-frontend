import Private from '../../../components/auth/Private';
import UpdateBlog from '../../../components/crud/UpdateBlog';
import Layout from '../../../components/Layout';

const UpdateSingleBlog = () => {
  return (
    <Layout>
      <Private>
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
      </Private>
    </Layout>
  );
};

export default UpdateSingleBlog;
