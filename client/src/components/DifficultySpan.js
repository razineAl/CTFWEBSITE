function DifficultySpan(props) {
    const {difficulty} = props;
  return (

            <div className="difficulty-container">
                {[...Array(5)].map((el,index)=>{
                    return(
                        <span key={index} className={`difficulty-${index+1} ${index < difficulty ? 'active' : ''}`}></span>
                    )
                })}
            </div>
  );
}
export default DifficultySpan;