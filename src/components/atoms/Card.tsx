
/* App Components */
import React from 'react';

/* Interfaces */
import { CardProps } from 'interfaces/components';

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl shadow-sm 
        border border-gray-200 dark:border-gray-700 
        overflow-hidden
        transition-all duration-300
        ${hoverable ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
