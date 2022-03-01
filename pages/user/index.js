import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import Link from 'next/link';

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User Dashboard</h2>
            </div>
            <div className="col-md-4">
              <div className="list-group">
                <div className="list-group-item">
                  <Link href="/user/crud/blog">
                    <a>Create Blog</a>
                  </Link>
                </div>
                <div className="list-group-item">
                  <Link href="/user/crud/blogs">
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
      </Private>
    </Layout>
  );
};

export default UserIndex;
