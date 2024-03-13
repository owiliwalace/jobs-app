import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'j'}`}>
      <div className="p-4 bg-gray-800 text-white">SideBar</div>
      <button className="p-2 bg-gray-600 text-white w-10" onClick={handleToggleCollapse}>
        Toggle Collapse
      </button>
    </div>
  );
};

export default Sidebar;
