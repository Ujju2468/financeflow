/**
 * Core UI Components for FinanceFlow
 * Reusable button, card, input, and modal components
 */

import React from 'react';
import { COLOR_PALETTE } from '@constants/index';

/**
 * Button Component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, fullWidth, children, className, ...props }, ref) => {
    const baseStyles =
      'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: `bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700`,
      secondary: `bg-neutral-200 text-neutral-900 hover:bg-neutral-300 active:bg-neutral-400`,
      success: `bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700`,
      danger: `bg-red-500 text-white hover:bg-red-600 active:bg-red-700`,
      warning: `bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700`,
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <span className="animate-spin">⏳</span> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Card Component
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  clickable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', clickable, className, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white border border-neutral-200',
      elevated: 'bg-white shadow-lg border border-neutral-100',
      outlined: 'bg-transparent border-2 border-neutral-300',
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg p-6 transition-all ${variantStyles[variant]} ${
          clickable ? 'cursor-pointer hover:shadow-md' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Input Component
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
          <input
            ref={ref}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all ${
              icon ? 'pl-10' : ''
            } ${error ? 'border-red-500' : 'border-neutral-300'} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {helpText && <p className="text-xs text-neutral-500 mt-1">{helpText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Badge Component
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-sky-100 text-sky-800',
      success: 'bg-emerald-100 text-emerald-800',
      warning: 'bg-amber-100 text-amber-800',
      danger: 'bg-red-100 text-red-800',
      neutral: 'bg-neutral-100 text-neutral-800',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={`inline-block rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Modal Component
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-xl w-full mx-4 ${sizeStyles[size]}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

        {/* Footer */}
        {actions && <div className="flex gap-3 justify-end p-6 border-t border-neutral-200">{actions}</div>}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

/**
 * Alert Component
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', onClose, className, children, ...props }, ref) => {
    const variantStyles = {
      info: 'bg-blue-50 border border-blue-200 text-blue-800',
      success: 'bg-emerald-50 border border-emerald-200 text-emerald-800',
      warning: 'bg-amber-50 border border-amber-200 text-amber-800',
      danger: 'bg-red-50 border border-red-200 text-red-800',
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg p-4 flex items-start gap-3 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <span className="text-lg flex-shrink-0">
          {variant === 'info' && 'ℹ️'}
          {variant === 'success' && '✅'}
          {variant === 'warning' && '⚠️'}
          {variant === 'danger' && '❌'}
        </span>
        <div className="flex-1">{children}</div>
        {onClose && (
          <button onClick={onClose} className="text-lg leading-none hover:opacity-70">
            ×
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * Skeleton Loader Component
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  height?: number;
  width?: string;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  count = 1,
  height = 20,
  width = '100%',
  circle,
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-neutral-200 animate-pulse mb-3 ${circle ? 'rounded-full' : 'rounded-lg'}`}
          style={{
            height: `${height}px`,
            width: circle ? `${height}px` : width,
          }}
        />
      ))}
    </div>
  );
};

Skeleton.displayName = 'Skeleton';
