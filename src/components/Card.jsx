import React from 'react';
import './Card.css';

export const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`card-title ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`card-description ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>{children}</div>
);
