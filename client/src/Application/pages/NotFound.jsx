import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main dir="rtl" className="grid min-h-screen place-items-center bg-canvas px-6 text-center">
      <div>
        <p className="text-7xl font-black text-primary">404</p>
        <h1 className="mt-4 text-3xl font-black text-ink">העמוד לא נמצא</h1>
        <Link to="/" className="mt-7 inline-flex rounded-full bg-primary px-7 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1">
          חזרה לעמוד הראשי
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
