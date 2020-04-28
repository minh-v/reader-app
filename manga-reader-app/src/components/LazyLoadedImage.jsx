import React, { useRef, useState, useEffect } from "react";

const LazyLoadedImage = (props) => {
  //const callback =
  const [showImage, setShowImage] = useState(false);
  const options = {
    root: null,
    rootMargin: "200px 0px",
    threshhold: 0,
  };

  const tempRef = useRef();

  useEffect(() => {
    //if showImage is false and image ref exists
    if (!showImage && tempRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //once interesected viewport
            setShowImage(true);
            observer.disconnect();
          }
        });
      }, options);

      observer.observe(tempRef.current);
      //return () => observer.disconnect();
    }
  }, [showImage]);

  //if image has intersected viewport
  if (showImage) {
    return <img {...props} referrerPolicy="no-referrer" />;
  } else return <h1 ref={tempRef}>lmao</h1>;
};

export default LazyLoadedImage;
