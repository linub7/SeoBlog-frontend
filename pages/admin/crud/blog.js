import Admin from '../../../components/auth/Admin';
import CreateBlog from '../../../components/crud/CreateBlog';
import Layout from '../../../components/Layout';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create new Blog</h2>
            </div>
            <div className="col-md-12">
              <CreateBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
