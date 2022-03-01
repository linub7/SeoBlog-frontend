import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCookie, isAuth } from '../../actions/auth';
import { deleteBlog, getAllBlogs } from '../../actions/blog';
import moment from 'moment';

const ReadBlog = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');

  const token = getCookie('token');

  const loadAllBlogs = () => {
    getAllBlogs(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };
  useEffect(() => {
    loadAllBlogs();
  }, []);

  const handleDeleteBlog = (slug) => {
    const answer = window.confirm('Are you Sure you want to delete Blog?');
    if (answer) {
      deleteBlog(slug, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMessage(data.message);
          loadAllBlogs();
        }
      });
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      // isAuth().role === 0 means regular users
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="btn btn-sm btn-info">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      // isAuth().role === 1 means admin
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="btn btn btn-danger mr-2">Update</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () =>
    blogs.map((blog, i) => (
      <div key={i} className="mb-5">
        <h3>{blog.title}</h3>
        <p className="mark">
          Written By {blog.postedBy.name} | Published on{' '}
          {moment(blog.updatedAt).fromNow()}{' '}
        </p>
        <button
          className="btn btn-sm btn-danger mr-2"
          onClick={() => handleDeleteBlog(blog.slug)}
        >
          Delete Blog
        </button>
        {showUpdateButton(blog)}
      </div>
    ));
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {message && <p className="alert alert-warning">{message}</p>}
          {showAllBlogs()}
        </div>
      </div>
    </>
  );
};

export default ReadBlog;
