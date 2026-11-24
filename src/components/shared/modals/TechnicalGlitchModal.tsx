"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import Modal from "@/components/shared/modals/Modal";
import { Button } from "@/components/ui/button";
import { CloseCircle, Refresh, Global } from "iconsax-react";

interface TechnicalGlitchModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onReset?: () => void;
  error?: string | null;
  title?: string;
  description?: string;
}

export function TechnicalGlitchModal({
  isOpen,
  onClose = () => {},
  onReset,
  title = "Technical Issue",
  description = "Something went wrong on our end. We've been notified and are already working on a fix. Please try again or reload the page.",
}: TechnicalGlitchModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      hideCloseButton={true}
      hideDefaultFooter={true}
      size="md"
    >
      <div className="flex flex-col items-center justify-center py-2 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <CloseCircle size={32} variant="Linear" color="currentColor" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-8 px-4 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col gap-3 w-full">
          {onReset && (
            <Button
              onClick={onReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 flex items-center justify-center gap-2 rounded-xl"
            >
              <Refresh size={18} variant="Linear" color="white" />
              Try Again
            </Button>
          )}
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 h-12 flex items-center justify-center gap-2 rounded-xl"
          >
            <Refresh size={18} variant="Linear" color="currentColor" />
            Reload Workspace
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = window.location.origin)}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border-gray-200 hover:bg-gray-50"
          >
            <Global size={18} variant="Linear" color="currentColor" />
            Return to Website
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <TechnicalGlitchModal
          isOpen={true}
          title="Unexpected Error"
          description="We've encountered an unexpected error. Our team has been notified, and we're working to resolve it as quickly as possible."
          onReset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}
