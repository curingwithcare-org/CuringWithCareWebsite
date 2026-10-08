import Link from "next/link";
import Icon from "./Icon";

const variants = {
  primary: "bg-care-700 text-white hover:bg-care-800 active:bg-care-900",
  secondary:
    "bg-white text-care-800 ring-1 ring-inset ring-care-300 hover:bg-care-50 hover:ring-care-400",
  ghost: "text-care-800 hover:bg-care-50",
  // For use on dark green bands.
  inverse: "bg-white text-care-900 hover:bg-care-50",
  "inverse-ghost": "text-white ring-1 ring-inset ring-white/50 hover:bg-white/10",
};

const sizes = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href || "");

/**
 * The one button. Renders a real <a>, <Link> or <button> so keyboards and
 * screen readers get the right thing. `icon` draws an arrow after the label.
 */
export default function Button({ href, children, variant = "primary", size = "md", icon, className = "", download, ...rest }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none transition-colors duration-150 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;
  const external = isExternal(href);
  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} className="-mr-0.5" />}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} {...rest}>
        {content}
      </button>
    );
  }
  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        {...(external && !href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
