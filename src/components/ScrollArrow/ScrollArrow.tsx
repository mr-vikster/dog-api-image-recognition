import '../App.css';

export const ScrollArrow = () =>{

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div className="scroll-top" onClick={scrollTop} >☝</div>
  );
}
