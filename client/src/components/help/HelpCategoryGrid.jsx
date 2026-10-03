import HelpCategoryCard from "./HelpCategoryCard";

function HelpCategoryGrid({ categories, onSelectCategory }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {categories.map((category) => (
        <HelpCategoryCard
          key={category.id}
          category={category}
          onClick={onSelectCategory}
        />
      ))}
    </div>
  );
}

export default HelpCategoryGrid;