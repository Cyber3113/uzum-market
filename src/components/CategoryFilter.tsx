
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold mb-4 text-center">Kategoriyalar</h3>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={selectedCategory === 'Barchasi' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('Barchasi')}
          className={`transition-all duration-300 ${
            selectedCategory === 'Barchasi'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'hover:bg-gray-100'
          }`}
        >
          Barchasi
        </Button>
        {categories.map((category) => (
          <div key={category} className="flex flex-col items-center gap-2">
            <Button
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => onCategoryChange(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'hover:bg-gray-100'
              }`}
            >
              {category}
            </Button>
            <Link to={`/category/${category.toLowerCase()}`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Barchasini ko'rish
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
