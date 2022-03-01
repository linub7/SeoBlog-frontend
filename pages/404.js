import Link from 'next/link';
const ErrorPage = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center pt-5">
        <div className="text-center">
          <h1>Page did not Found</h1>
          <Link href="/">
            <a className="btn btn-primary">Go Back</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
