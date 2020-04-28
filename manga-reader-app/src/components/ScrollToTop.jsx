import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//used when switching between manga pages
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  window.scrollTo(0, 0);
  return null;
}
