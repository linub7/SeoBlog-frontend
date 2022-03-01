import { useEffect, useState } from 'react';
import { getCookie } from '../../actions/auth';
import { createTag, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
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

    createTag({ name }, token).then((data) => {
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

  const handleDeleteTag = (slug) => {
    removeTag(slug, token).then((data) => {
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
    const confirm = window.confirm('Are you sure to delete this Tag?');
    if (confirm) {
      handleDeleteTag(slug);
    }
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag Created Successfully</p>;
    }
  };
  const showError = () => {
    if (error) {
      return <p className="text-success">Tag Already Exists</p>;
    }
  };
  const showRemove = () => {
    if (removed) {
      return <p className="text-danger">Tag removed</p>;
    }
  };

  const showTags = () => {
    return tags.map((tag, i) => (
      <button
        key={i}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
        title="Double Click to remove"
        onDoubleClick={() => deleteConfirm(tag.slug)}
      >
        {tag.name}
      </button>
    ));
  };

  const newTagForm = () => (
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
        {newTagForm()}
        <hr />
        {showTags()}
      </div>
    </>
  );
};

export default Tag;
