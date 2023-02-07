import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/index.mdx';
import Blogs from './pages/blog';
import { MDXProvider } from '@mdx-js/react';
import CodeEditor from './components/CodeEditor';
import CodeViewer from './components/CodeEditor/CodeViewer';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const components = {
    CodeEditor,
    CodeViewer,
  };

  return (
    <main>
      <MDXProvider components={components}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blog">
              <Route path="" element={<Blogs />} />
              <Route path=":title" element={<Blog />} />
            </Route>
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </BrowserRouter>
      </MDXProvider>
    </main>
  );
}

export default App;
