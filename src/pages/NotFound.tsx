
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saas-blue/10 mb-6">
          <span className="text-2xl font-semibold text-saas-blue">404</span>
        </div>
        <h1 className="text-3xl font-display font-semibold mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the page you're looking for. The page may have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-saas-blue text-white rounded-lg hover:bg-saas-blue-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
