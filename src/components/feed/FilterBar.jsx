import { Clock, TrendingUp } from 'lucide-react';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex items-center mb-6 bg-gray-900 rounded-lg p-2 border border-gray-800">
      <button
        onClick={() => onFilterChange('recent')}
        className={`flex items-center px-4 py-2 rounded-lg mr-2 ${
          currentFilter === 'recent'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        } transition-colors`}
      >
        <Clock size={18} className="mr-2" />
        Recent
      </button>
      
      <button
        onClick={() => onFilterChange('popular')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          currentFilter === 'popular'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        } transition-colors`}
      >
        <TrendingUp size={18} className="mr-2" />
        Popular
      </button>
      
      <div className="ml-auto flex items-center">
        <select
          className="bg-gray-800 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
        >
          <option value="all">All Genres</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          <option value="hiphop">Hip Hop</option>
          <option value="electronic">Electronic</option>
          <option value="classical">Classical</option>
          <option value="folk">Folk</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;