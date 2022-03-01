/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { getSingleBlog, updateBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillFormats, QuillModules } from '../../helpers/quill';
import { API } from '../../config';

const UpdateBlog = ({ router }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [body, setBody] = useState('');
  const [values, setValues] = useState({
    title: '',
    success: '',
    formData: typeof window !== 'undefined' && new FormData(),
    error: '',
    body: '',
  });

  const { title, success, formData, error } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      getSingleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };
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

  const setCategoriesArray = (blogCategories) => {
    let categoriesArray = [];
    blogCategories.map((category, i) => {
      categoriesArray.push(category._id);
    });
    setCheckedCategories(categoriesArray);
  };

  const setTagsArray = (blogTags) => {
    let tagsArray = [];
    blogTags.map((tag, i) => {
      tagsArray.push(tag._id);
    });
    setCheckedTags(tagsArray);
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
  };

  const handleChange = (name) => (e) => {
    const value = name == 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
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

  const findOutCategory = (categoryId) => {
    const result = checkedCategories.indexOf(categoryId);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = (tagId) => {
    const result = checkedTags.indexOf(tagId);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const editBlog = (e) => {
    e.preventDefault();
    updateBlog(router.query.slug, formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          success: `Blog titled ${data.title} successfully updated!`,
        });
        if (isAuth() && isAuth().role === 1) {
          Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          Router.replace(`/user`);
        }
      }
    });
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
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
          <button className="btn btn-primary mb-3" type="submit">
            Update
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
          checked={findOutCategory(category._id)}
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
          checked={findOutTag(tag._id)}
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
          {updateBlogForm()}
          {body && (
            <img
              src={`${API}/api/blog/photo/${router.query.slug}`}
              alt={title}
              style={{ width: '100%' }}
            />
          )}
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

export default withRouter(UpdateBlog);
