import { useEffect, type RefObject } from "react";

export const usePlaceholder = (
  ref: RefObject<HTMLDivElement | null>,
  placeholderText: string,
) => {
  useEffect(() => {
    if (!ref.current) return;
    ref.current.setAttribute("placeholder", placeholderText);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const handleRemoveBr = () => {
      const text = element.textContent;
      if (text === "") {
        element.innerHTML = ""; // 清空 <br>
        element.setAttribute("placeholder", placeholderText);
      } else {
        element.removeAttribute("placeholder");
      }
    };
    element.addEventListener("input", handleRemoveBr);
    return () => {
      element.removeEventListener("input", handleRemoveBr);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const addPlaceholder = () => {
      element.setAttribute("placeholder", placeholderText);
    };
    const removePlaceholder = () => {
      element.removeAttribute("placeholder");
    };
    element.addEventListener("blur", removePlaceholder);
    element.addEventListener("focus", addPlaceholder);
    return () => {
      element.removeEventListener("blur", removePlaceholder);
      element.removeEventListener("focus", addPlaceholder);
    };
  }, []);
};
