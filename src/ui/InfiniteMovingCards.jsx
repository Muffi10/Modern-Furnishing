"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import LazyImage from "../components/LazyImage";

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [brands, setBrands] = useState([]);

  // Fetch brand data from Firestore
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsCollection = collection(db, 'brands');
        const brandSnapshot = await getDocs(brandsCollection);
        const brandList = brandSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBrands(brandList);
      } catch (error) {
        console.error("Error fetching brands: ", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    addAnimation();
  }, [brands]);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // Only duplicate the content once after the initial render
      if (scrollerRef.current.children.length === brands.length) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current.appendChild(duplicatedItem);
        });
      }
  
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const speedMap = {
        fast: "30s",  // Adjusted to make it faster
        normal: "40s",
        slow: "40s",
      };
      containerRef.current.style.setProperty("--animation-duration", speedMap[speed]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl mt-10 mb-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div className="flex items-center justify-center mt-5 mb-5 text-3xl font-bold">
        <h2> <span className="italic">Brands We Partner With</span></h2>
      </div>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {brands.map((brand) => (
          <li key={brand.id} className="flex-shrink-0 w-[150px]">
            <LazyImage
              src={brand.logo} 
              alt={brand.name} 
              className="object-contain w-full h-auto rounded-lg shadow-md" 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
