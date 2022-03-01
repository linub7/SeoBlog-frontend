/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import renderHtml from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ blog }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              src={`${API}/api/blog/photo/${blog.slug}`}
              className="img img-fluid"
              style={{ height: '250px', width: '100%' }}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>
      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <div className="card-title font-weight-bold">{blog.title}</div>
            </a>
          </Link>
        </section>
        <p className="card-tex">{renderHtml(blog.excerpt)}</p>
      </div>
      <div className="card-body">
        Posted {moment(blog.updatedAt).fromNow()} by{' '}
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a className="float-right font-weight-bold">
            {blog.postedBy.username}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
