import React, { Component, ReactNode } from "react";
import { Alert } from "@chakra-ui/react";

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>{error?.message || "Something went wrong"}</Alert.Title>
        </Alert.Root>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
