import Link from 'next/link';
import renderHtml from 'react-render-html';
import Image from 'next/image';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
  const showBlogCategories = (blog) =>
    blog.categories.map((category, i) => (
      <Link key={i} href={`/categories/${category.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-2">{category.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-2">{tag.name}</a>
      </Link>
    ));
  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written By{' '}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a className="font-weight-bold">{blog.postedBy.username}</a>
          </Link>{' '}
          | Published at {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br />
        <br />
      </section>
      <div className="row">
        <div className="col-md-4">
          <Image
            src={`${API}/api/blog/photo/${blog.slug}`}
            height={180}
            width={290}
            className="img-fluid"
            alt={blog.title}
          />
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHtml(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read More</a>
            </Link>
          </section>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Card;
