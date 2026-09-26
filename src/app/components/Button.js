import Link from "next/link";

export default function Button({ 
  link, 
  text, 
  className = "", 
  style = {}, 
  variant = "primary", 
  icon = null,
  onClick = null
}) {
  // Define the base button classes - balanced size between too tall and too short
  const baseClasses = "group relative inline-flex items-center justify-center px-4 py-2.5 overflow-hidden font-medium rounded-md text-sm transition-all duration-300";
  
  // Define variant specific classes
  const variants = {
    primary: "text-white bg-color-700 shadow-md hover:shadow-lg",
    secondary: "text-gray-800 bg-gray-100 border border-gray-300",
    outline: "text-color-700 bg-transparent border-2 border-color-700",
    ghost: "text-color-700 bg-transparent hover:bg-color-50"
  };
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;
  
  // Handle button click for non-link buttons
  const handleClick = (e) => {
    if (!link && onClick) {
      onClick(e);
    }
  };
  
  return (
    <Link href={link || "#"}> 
      <div 
        onClick={handleClick}
        className={buttonClasses}
        style={style}
      >
        {/* Cool spotlight hover effect */}
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 bg-gradient-to-br from-white via-transparent to-transparent group-hover:opacity-10 blur-sm"></span>
        <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-gradient-to-r from-color-600 to-color-800 group-hover:w-full opacity-0 group-hover:opacity-80"></span>
        
        {/* Button content */}
        <span className="relative flex items-center gap-2 transition-colors duration-300 ease-in-out group-hover:text-white">
          {icon && <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">{icon}</span>}
          {text}
        </span>
        
        {/* Bottom shine effect */}
        <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-color-500 transition-all duration-500 ease-out group-hover:w-full"></span>
      </div>
    </Link>
  );
}