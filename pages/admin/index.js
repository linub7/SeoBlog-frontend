import Admin from '../../components/auth/Admin';
import Layout from '../../components/Layout';
import Link from 'next/link';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Admin Dashboard</h2>
            </div>
            <div className="col-md-4">
              <div className="list-group">
                <div className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Category and Tag</a>
                  </Link>
                </div>
                <div className="list-group-item">
                  <Link href="/admin/crud/blog">
                    <a>Create Blog</a>
                  </Link>
                </div>
                <div className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Update/Remove Blogs</a>
                  </Link>
                </div>
                <div className="list-group-item">
                  <Link href="/user/update">
                    <a>Update Profile</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
