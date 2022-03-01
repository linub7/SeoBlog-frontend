/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSingleBlog, listRelatedBlogs } from '../../actions/blog';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { API, APP_NAME, DOMAIN } from '../../config';
import moment from 'moment';
import renderHtml from 'react-render-html';
import { useRouter } from 'next/router';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog, query }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const loadRelatedBlogs = () => {
      listRelatedBlogs({ blog }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setRelatedBlogs(data);
        }
      });
    };
    loadRelatedBlogs();
  }, [blog]);

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta
        property="og:image"
        content={`${API}/api/blog/photo/${blog.slug}`}
      />
      <meta
        property="og:image:secure_url"
        content={`${API}/api/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
    </Head>
  );
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

  const showRelatedBlogs = () =>
    relatedBlogs.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog._id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

  return (
    <>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: '-30px' }}>
                  <img
                    src={`${API}/api/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                    height={400}
                    width={600}
                  />
                </div>
              </section>
              <section>
                <div className="con">
                  <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written By{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a className="font-weight-bold">
                        {blog.postedBy.username}
                      </a>
                    </Link>{' '}
                    | Published at {moment(blog.updatedAt).fromNow()}
                  </p>
                  <div className="pb-3">
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHtml(blog.body)}</div>
              </section>
            </div>
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <hr />
              <div className="row">{showRelatedBlogs()}</div>
            </div>
            <div className="container pb-5">{showComments()}</div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return getSingleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    }
    return {
      blog: data,
      query,
    };
  });
};

export default SingleBlog;
