import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full min-h-screen bg-neutral-50 ${className}`}>
      {/* Responsive container with breakpoint-specific padding */}
      {/* Mobile: px-4, Tablet: px-6, Desktop: px-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {children}
      </div>
    </div>
  );
};
