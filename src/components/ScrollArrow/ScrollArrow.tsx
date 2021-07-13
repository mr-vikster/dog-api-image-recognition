import { useState } from 'react';

import '../App.css';

export const ScrollArrow = () =>{

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false);
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <div className="scroll-top" onClick={scrollTop} style={{display: showScroll ? 'flex' : 'none'}}>☝</div>
  );
}
