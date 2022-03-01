import Head from 'next/head';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
import { getSingleTag } from '../../actions/tag';
import { APP_NAME, DOMAIN } from '../../config';

const Tag = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best programming Tutorials on ${tag.name}`}
      />
      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best programming Tutorials on ${tag.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${DOMAIN}/images/image.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/images/image.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
    </Head>
  );
  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                {blogs.map((blog, i) => (
                  <Card key={i} blog={blog} />
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Tag.getInitialProps = ({ query }) => {
  return getSingleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs };
    }
  });
};

export default Tag;
