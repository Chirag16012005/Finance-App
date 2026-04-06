export default function Button({ children, className = "", fullWidth = true, variant = "primary", ...props }) {
  const baseClasses = `${fullWidth ? "w-full" : "inline-flex"} px-4 py-2 rounded-md transition font-medium disabled:opacity-60 ${className}`;
  
  if (variant === "secondary") {
    return (
      <button className={`${baseClasses} bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700`} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={`${baseClasses} bg-blue-500 text-white hover:bg-blue-600`} {...props}>
      {children}
    </button>
  );
}
