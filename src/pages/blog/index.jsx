import React from 'react';
import { Link, Route } from 'react-router-dom';
const modules = import.meta.glob('./*.mdx', { eager: true });

console.log('modules', modules);
const Blogs = (props) => {
  return (
    <>
      <h2>Posts</h2>
      {Object.entries(modules).map(([filename, article], index) => {
        let Blog = article.default;
        const extract = filename.match(/([^/]+)\.([^.]+)$/);
        const result = extract.slice(1, 3); // [filename, ext]

        const titleStr = (article.meta && article.meta.title) || result[0];
        let { title = titleStr, file = titleStr } = article.meta || {};
        console.log(filename, titleStr);
        return (
          <Link to={`${file}`} key={file}>
            <h2>{title}</h2>
          </Link>
        );
      })}
    </>
  );
};

export default Blogs;
