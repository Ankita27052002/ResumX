import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'professional-button';
  
  const variantClasses = {
    primary: 'professional-button-primary',
    secondary: 'professional-button-secondary',
    success: 'professional-button-success',
    danger: 'professional-button-danger',
    ghost: 'professional-button-ghost',
  };
  
  const sizeClasses = {
    small: 'professional-button-small',
    medium: 'professional-button-medium',
    large: 'professional-button-large',
  };
  
  const disabledClass = disabled ? 'professional-button-disabled' : '';
  const fullWidthClass = fullWidth ? 'professional-button-full-width' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${fullWidthClass} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <span className="professional-button-content">
        {children}
      </span>
      <span className="professional-button-shimmer"></span>
    </button>
  );
};

export default Button;
