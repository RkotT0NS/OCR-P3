import { Component } from 'react';
import DefaultErrorRenderer from './DefaultErrorRenderer';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    ErrorRenderer?: React.ElementType;
    context?: Record<string, string>;
}
export class ErrorBoundary extends Component<ErrorBoundaryProps, {hasError:boolean, error?:unknown}> {
    ErrorRenderer?: React.ElementType;
    constructor(props:ErrorBoundaryProps) {
        super(props);
        this.ErrorRenderer = props.ErrorRenderer;
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error };
    }

    componentDidCatch(error: unknown, errorInfo:unknown) {
        console.error({
            error,
            errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {
            const ErrorRenderer = (
                this.ErrorRenderer
                || DefaultErrorRenderer
            );

            return (
                <ErrorRenderer
                    error={this.state.error}
                    {...this.props.context}
                />
            );
        }

        return this.props.children;
    }
}
