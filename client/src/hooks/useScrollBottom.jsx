import { useEffect, useRef } from "react";

export default function useScrollBottom(dependencies = []) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, dependencies); 

  return bottomRef;
}
