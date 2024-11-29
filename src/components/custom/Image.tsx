import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

import { cn } from "../../lib/utils";
interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  skeletonClassName?: string; // Optional skeleton-specific class
  delay?: boolean;
}

const Image: React.FC<CustomImageProps> = ({
  src,
  alt,
  className,
  skeletonClassName,
  delay = true,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    // Delay hiding the skeleton for a smooth effect
    if (delay) {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } else {
      setLoading(false); // Immediately hide the skeleton if delay is not specified
    }
    return;
  };

  return (
    <div className={cn("relative", className)}>
      {/* Skeleton */}
      {loading && (
        <Skeleton
          className={cn(
            "absolute inset-0 w-full h-full",
            skeletonClassName // Apply specific styles for the skeleton if provided
          )}
        />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "object-cover",
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-300",
          className
        )}
        onLoad={handleImageLoad} // Trigger skeleton hiding on load
        {...props}
      />
    </div>
  );
};

export default Image;
