import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { createBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillFormats, QuillModules } from '../../helpers/quill';

const CreateBlog = ({ router }) => {
  const blogFromLocalStorage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState(blogFromLocalStorage());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
  });

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name == 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: '',
          title: '',
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleCategoriesToggle = (categoryId) => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedCategory = checkedCategories.indexOf(categoryId);
    const all = [...checkedCategories];
    if (clickedCategory === -1) {
      all.push(categoryId);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log('Categories: ', all);
    setCheckedCategories(all);
    formData.set('categories', all);
  };

  const handleTagsToggle = (tagId) => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedTag = checkedTags.indexOf(tagId);
    const all = [...checkedTags];
    if (clickedTag === -1) {
      all.push(tagId);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log('Tags: ', all);
    setCheckedTags(all);
    formData.set('tags', all);
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleChange('title')}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing"
            onChange={handleBody}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            publish
          </button>
        </div>
      </form>
    );
  };

  const showCategories = () =>
    categories &&
    categories.map((category, index) => (
      <li key={index} className="list-unstyled">
        <input
          onChange={() => handleCategoriesToggle(category._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">{category.name}</label>
      </li>
    ));

  const showTags = () =>
    tags &&
    tags.map((tag, index) => (
      <li key={index} className="list-unstyled">
        <input
          onChange={() => handleTagsToggle(tag._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">{tag.name}</label>
      </li>
    ));

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <hr />
              <small className="text-muted">Max Size: 1Mb</small>
              <div>
                <label className="btn btn-outline-info">
                  Upload Featured Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange('photo')}
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
