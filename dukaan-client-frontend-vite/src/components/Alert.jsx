import React from 'react';

export function Alert({ children, className = '' }) {
  return (
    <div className={`alert ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children }) {
  return <h4 className="alert-title">{children}</h4>;
}

export function AlertDescription({ children }) {
  return <div className="alert-description">{children}</div>;
}

