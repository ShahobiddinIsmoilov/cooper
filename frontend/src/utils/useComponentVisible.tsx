import { useState, useEffect, useRef } from "react";
import onClickOutside from "react-onclickoutside";

export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event: any) => {
    setIsComponentVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
