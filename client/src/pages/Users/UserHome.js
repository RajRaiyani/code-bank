import AllQuestion from "../../utilities/AllQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

const UserHome = () => {
  function GetLevel() {
    return (
      <>
        <div className="dropdown">
          <a
            className="btn btn-light border dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Level
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a className="dropdown-item" href="#">
                Easy
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                hard
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                medium
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
  function GetCatagary() {
    return (
      <>
        <div className="dropdown">
          <a
            className="btn btn-light border dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Catagary
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a className="dropdown-item" href="#">
                utsav
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                raj
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                harshil
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
  function SearchBtn() {
    return (
      <>
        <div className="input-group">
          <div class="form-outline">
            <input
              type="search"
              id="form1"
              class="form-control"
              placeholder="Search"
            />
          </div>
          <button type="button" class="btn btn-primary">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className=" d-flex justify-content-between pb-2">
          <div className=" d-flex justify-content-start gap-2">
            <GetLevel />
            <GetCatagary />
          </div>
          <div>
            <SearchBtn />
          </div>
        </div>
      </div>
      <AllQuestion></AllQuestion>
    </>
  );
};

export default UserHome;
