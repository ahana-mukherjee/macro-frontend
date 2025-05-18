import React from 'react';

const TabSwitcher = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex overflow-x-auto rounded-lg bg-gray-800 p-1 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex-1 whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
            ${activeTab === tab.id 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }
          `}
        >
          <div className="flex items-center justify-center">
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && (
              <span 
                className={`ml-2 px-2 py-0.5 text-xs rounded-full
                  ${activeTab === tab.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-700 text-gray-400'
                  }
                `}
              >
                {tab.count}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;