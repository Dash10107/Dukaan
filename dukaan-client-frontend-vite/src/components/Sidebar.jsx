import React from 'react';
import { Card } from './Card';

const SidebarLink = ({ href, children }) => (
  <a href={href} className="block py-2 px-4 text-sm hover:bg-gray-100 rounded">
    {children}
  </a>
);

export function Sidebar() {
  return (
    <Card className="w-64 h-full overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <SidebarLink href="#introduction">Introduction</SidebarLink>
          </li>
          <li>
            <SidebarLink href="#authentication">Authentication</SidebarLink>
          </li>
          <li>
            <SidebarLink href="#products">Products</SidebarLink>
            <ul className="pl-4 mt-2 space-y-2">
              <li><SidebarLink href="#get-products">Get Products</SidebarLink></li>
              <li><SidebarLink href="#pagination">Pagination</SidebarLink></li>
              <li><SidebarLink href="#sorting">Sorting</SidebarLink></li>
              <li><SidebarLink href="#filtering">Filtering</SidebarLink></li>
              <li><SidebarLink href="#field-selection">Field Selection</SidebarLink></li>
            </ul>
          </li>
          <li>
            <SidebarLink href="#search">Search Products</SidebarLink>
          </li>
          <li>
            <SidebarLink href="#recommend">Recommend Products</SidebarLink>
          </li>
        </ul>
      </nav>
    </Card>
  );
}
