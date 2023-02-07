import React from "react";
import ReactDOM from "react-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    // Log or store the error
    console.error(error);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
