import React from 'react'
const BlogContext = React.createContext({
    isAuthenticated : null,
    setIsAuthenticated : () => {}
  });

  export default BlogContext
