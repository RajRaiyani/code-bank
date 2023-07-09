function GetLevel(props) {
    return (
      <>
        <div className="dropdown">
          <select value={props.level} onChange={(e)=>{props.setlevel(e.target.value)}}>
          <option disabled selected hidden>
              Level
            </option>
            <option className="text-danger" value="">
              none
              </option>
              <option className=" text-success" value="Easy" >
                Easy
              </option>
              <option className="text-warning"  value="Medium">
              Medium              </option>
              <option className="text-danger" value="Hard">
              Hard
              </option>
              

          </select>
        </div>
      </>
    );
  }
  
  export default GetLevel;