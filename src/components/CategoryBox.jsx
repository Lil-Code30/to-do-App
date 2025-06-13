export default function CategoryBox({ count, categoryName }) {
  return (
    <div
      className={`${categoryName} rounded border border-${categoryName} p-1`}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold">{count}</h1>
      <span className="font-semibold text-xl">
        {categoryName[0].toUpperCase() + categoryName.slice(1)}
      </span>
    </div>
  );
}

/*

props = {
 - category name
 - category count 
 - class for the specific category : personal, business etc...
}

*/
