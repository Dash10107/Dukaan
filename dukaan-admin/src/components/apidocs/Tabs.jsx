import React, { useState } from 'react';

export function Tabs({ children, defaultValue, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const updatedChildren = React.Children.map(children, child => {
    if (child.type === TabsList || child.type === TabsContent) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return (
    <div className={`tabs ${className}`}>
      {updatedChildren}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  const updatedChildren = React.Children.map(children, child => {
    if (child.type === TabsTrigger) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return (
    <div className="tabs-list">
      {updatedChildren}
    </div>
  );
}

export function TabsTrigger({ children, value, activeTab, setActiveTab }) {
  return (
    <button
      className={`tab-button ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, activeTab }) {
  if (value !== activeTab) return null;
  return (
    <div className="tab-content">
      {children}
    </div>
  );
}

