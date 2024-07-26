'use client';

import React from 'react';
import { Hexagon } from 'lucide-react';
import { useUser, UserRole } from '@/contexts/UserContext';

const Header: React.FC = () => {
  const { role, setRole } = useUser();

  const roleColors: Record<UserRole, string> = {
    reader: 'bg-primary text-white',
    contributor: 'bg-green-500 text-white',
    productOwner: 'bg-purple-500 text-white'
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-main border-b border-border">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Hexagon size={24} className="text-primary mr-2" />
          <h1 className="text-xl font-heading font-semibold text-text-primary">Falck Data Platform</h1>
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className={`px-2 py-1 rounded-md ${roleColors[role]}`}
        >
          <option value="reader">Reader</option>
          <option value="contributor">Contributor</option>
          <option value="productOwner">Product Owner</option>
        </select>
      </div>
    </header>
  );
};

export default Header;