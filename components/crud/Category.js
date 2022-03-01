import { useEffect, useState } from 'react';
import { getCookie } from '../../actions/auth';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../actions/category';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const token = getCookie('token');

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCategory({ name }, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          removed: false,
          reload: !reload,
        });
      }
    });
  };

  const handleDeleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const deleteConfirm = (slug) => {
    const confirm = window.confirm('Are you sure to delete this Category?');
    if (confirm) {
      handleDeleteCategory(slug);
    }
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category Created Successfully</p>;
    }
  };
  const showError = () => {
    if (error) {
      return <p className="text-success">Category Already Exists</p>;
    }
  };
  const showRemove = () => {
    if (removed) {
      return <p className="text-danger">Category removed</p>;
    }
  };

  const showCategories = () => {
    return categories.map((category, i) => (
      <button
        key={i}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
        title="Double Click to remove"
        onDoubleClick={() => deleteConfirm(category.slug)}
      >
        {category.name}
      </button>
    ));
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          required
          onChange={handleChange}
          value={name}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: false });
  };
  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemove()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        <hr />
        {showCategories()}
      </div>
    </>
  );
};

export default Category;
