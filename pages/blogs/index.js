import Head from 'next/head';
import Card from '../../components/blog/Card';
import { useState } from 'react';
import { getAllBlogsCategoriesTags } from '../../actions/blog';
import Layout from '../../components/Layout';
import { API, DOMAIN, APP_NAME } from '../../config';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Blogs = ({ categories, blogs, tags, size }) => {
  const router = useRouter();
  const head = () => (
    <Head>
      <title>Programming Blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming Blogs and tutorials on react node next vue php laravel and web development"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web development tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming Blogs and tutorials on react node next vue php laravel and web development"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${DOMAIN}/images/image.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/images/image.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
    </Head>
  );
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return <Card blog={blog} key={i} />;
    });
  };

  const showAllCategories = () =>
    categories.map((category, i) => (
      <Link key={i} href={`/categories/${category.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{category.name}</a>
      </Link>
    ));

  const showAllTags = () =>
    tags.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));

  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programming Blogs and Tutorials
                </h1>
              </div>
              <section>
                <div className="pb-5 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">{showAllBlogs()}</div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

Blogs.getInitialProps = () => {
  return getAllBlogsCategoriesTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    }

    return {
      blogs: data.blogs,
      categories: data.categories,
      tags: data.tags,
      size: data.size,
    };
  });
};

export default Blogs;
