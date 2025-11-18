import { useEffect, useState } from "react";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
  <div>
      <div>Throttle Page</div>
      <p>ScrollY : {scrollY}</p>
  </div>
  
  );
};

export default ThrottlePage;