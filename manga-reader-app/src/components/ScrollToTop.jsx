import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    //console.log("working..");
    window.scrollTo(0, 0);
    //document.getElementById("root").scrollTop = 0;
  }, [pathname]);

  return null;
}
