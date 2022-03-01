import Link from 'next/link';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: '',
  });
  const { search, results, searched, message } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        search: undefined,
        searched: true,
        results: data,
        message: `${data.length} blogs found`,
      });
    });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control mb-2"
            placeholder="Search Blog"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-block btn-outline-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  const searchedBlogs = (results = []) => (
    <div className="jumbotron bg-white">
      {message && <p className="pt-4 text-muted font-italic">{message}</p>}

      {results.map((blog, i) => (
        <div key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="text-primary">{blog.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-5">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>
          {searchedBlogs(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
