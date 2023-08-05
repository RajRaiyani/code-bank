import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai';

const MangeLanguge = () => {
    const [message, setMessage] = useState();
    const [inputValue, setInputValue] = useState('');
    const [arrayValues, setArrayValues] = useState([]);


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        fetch("http://localhost:3007/api/v1/home/list/get/language", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": Cookies.get("adminToken")
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setArrayValues(res.data.list);
                }
                else if (res.status === "EXPIRED_TOKEN") {
                    Navigate("/login");
                }
                else {
                    setMessage(res.message);
                }
            })
            .catch(e => console.log("error : " + e));

    }, [])

    function deleteCatagory(props) {
        fetch("http://localhost:3007/api/v1/admin/list/alter/language/remove/" + props, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "token": Cookies.get("adminToken")
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setArrayValues(arrayValues.filter((e) => e !== props));
                }
                else if (res.status === "EXPIRED_TOKEN") {
                    Navigate("/login");
                }
                else {
                    setMessage(res.message);
                }
            })
            .catch(e => console.log("error : " + e));
    }


    const AddtoCatagory = () => {
        fetch("http://localhost:3007/api/v1/admin/list/alter/language/add/" + inputValue, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "token": Cookies.get("adminToken")
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setArrayValues([...arrayValues, inputValue]);
                    setInputValue("");

                }
                else if (res.status === "EXPIRED_TOKEN") {
                    Navigate("/login");
                }
                else {
                    setMessage(res.message);
                }
            })
            .catch(e => console.log("error : " + e));

    };


   
    return (
      <div className="overflow-auto w-100" style={{ height: "100vh" }}>
        {/* {message}

        <div>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={AddtoCatagory}>Add to language</button>
        </div> */}
        <div className="container" style={{ marginTop: "2rem" }}>
          <h1>Add Languages</h1>
          <h3 className="text-danger">{message}</h3>
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Enter a Language :
            </label>
            <div className="d-flex gap-2">
              <input
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter a Language"
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}
              />
              <button className="btn btn-primary" onClick={AddtoCatagory}>
                Add
              </button>
            </div>
          </div>
          <table className="table border text-center table-striped table-bordered">
            <thead>
              <tr>
                <th>catagories</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {arrayValues.map((value, index) => (
                <tr key={index} className="QuestionBox">
                  <td>{value}</td>
                  <td>
                    <button
                      className="btn-outline-danger"
                      onClick={() => {
                        deleteCatagory(value);
                      }}
                    >
                      {" "}
                      <AiOutlineDelete />{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default MangeLanguge;