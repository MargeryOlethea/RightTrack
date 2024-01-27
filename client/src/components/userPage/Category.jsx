/* eslint-disable react/prop-types */
const Category = ({ text }) => {
  let category;

  switch (text) {
    case "shopping":
      category = (
        <span className="border rounded-full text-xs border-indigo-500 text-indigo-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "transportation":
      category = (
        <span className="border rounded-full text-xs border-green-500 text-green-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "entertainment":
      category = (
        <span className="border rounded-full text-xs border-yellow-500 text-yellow-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "bills":
      category = (
        <span className="border rounded-full text-xs border-purple-500 text-purple-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "clothes":
      category = (
        <span className="border rounded-full text-xs border-blue-500 text-blue-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "health":
      category = (
        <span className="border rounded-full text-xs border-red-500 text-red-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "education":
      category = (
        <span className="border rounded-full text-xs border-teal-500 text-teal-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "gift":
      category = (
        <span className="border rounded-full text-xs border-pink-500 text-pink-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "savings":
      category = (
        <span className="border rounded-full text-xs border-fuchsia-700 text-fuchsia-700 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "other":
      category = (
        <span className="border rounded-full text-xs border-gray-500 text-gray-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    case "food":
      category = (
        <span className="border rounded-full text-xs border-orange-500 text-orange-500 px-3 py-2">
          {text}
        </span>
      );
      break;
    default:
      category = (
        <span className="border rounded-full text-xs border-blue-500 text-blue-500 px-3 py-2">
          {text}
        </span>
      );
  }

  return <>{category}</>;
};

export default Category;
