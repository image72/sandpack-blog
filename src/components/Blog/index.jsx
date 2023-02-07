import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";

export default function Blog() {
  let { title } = useParams();

  const Blog = lazy(() => import(`../../pages/blog/${title}.mdx`));

  return (
    <ErrorBoundary fallback={<p>404</p>}>
      <Suspense fallback={<p>Loading.....</p>}>
        <Blog />
      </Suspense>
    </ErrorBoundary>
  );
}
