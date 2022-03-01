import { isAuth } from '../../../actions/auth';
import Private from '../../../components/auth/Private';
import ReadBlog from '../../../components/crud/ReadBlog';
import Layout from '../../../components/Layout';

const Blogs = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Blogs</h2>
            </div>
            <div className="col-md-12">
              <ReadBlog username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blogs;
