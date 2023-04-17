import "./styles.css";
import { useState } from "react";

export default function App() {
  const [isPinNumber, setPinNumber] = useState(!true);

  const [pinDataInfo, setPinDataInfo] = useState([]);
  const [dataByBranchName, setDataByBranchName] = useState([]);

  const onPinSubmitHandler = () => {
    console.log(document.getElementsByClassName("user-pin-input")[0]?.value);
    const userPinNumer = document.getElementsByClassName("user-pin-input")[0]
      ?.value;

    const pinUrl = `https://api.postalpincode.in/pincode/${userPinNumer}`;
    console.log(pinUrl);
    fetch(pinUrl)
      .then((jsonDataInfo) => jsonDataInfo.json())
      .then((data) => setPinDataInfo(data[0].PostOffice));

    document.getElementsByClassName("user-pin-input")[0].value = "";
  };

  pinDataInfo.map((el) => console.log(el));

  const byPinNumber = () => {
    return (
      <div className="pin-number-container">
        <div className="pin-number-content">
          Pin number : <input className="user-pin-input" />{" "}
          <button onClick={() => onPinSubmitHandler(this)}>search</button>
        </div>
        {pinDataInfo.length ? (
          <div className="search-data">
            <table>
              <tbody>
                <tr className="table-header">
                  <td>Sr. no</td>
                  <td>Country</td>
                  <td>Circle</td>
                  <td>Region</td>
                  <td>Division</td>
                  <td>Branch Type</td>
                  <td>Name</td>
                </tr>
                {pinDataInfo.map((el, key) => (
                  <tr className="table-data">
                    <td>{key + 1}.</td>
                    <td>{el.Country}</td>
                    <td>{el.Circle}</td>
                    <td>{el.Region}</td>
                    <td>{el.Division}</td>
                    <td>{el.BranchType}</td>
                    <td>{el.Name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const onBranchNameSubmitHandler = () => {
    console.log(document.getElementsByClassName("user-branch-input")[0]?.value);
    const userBranchInput = document.getElementsByClassName(
      "user-branch-input"
    )[0]?.value;

    const branchUrl = `https://api.postalpincode.in/postoffice/${userBranchInput}`;
    fetch(branchUrl)
      .then((jsonDataInfo) => jsonDataInfo.json())
      .then((data) => setDataByBranchName(data[0].PostOffice));

    document.getElementsByClassName("user-branch-input")[0].value = "";
  };

  const byPostOfficeBranchName = () => {
    return (
      <div className="branch-name-container">
        <div className="branch-name-content">
          Post office branch name : <input className="user-branch-input" />{" "}
          <button onClick={() => onBranchNameSubmitHandler()}>search</button>
        </div>
        {dataByBranchName.length ? (
          <div className="search-data">
            <table>
              <tbody>
                <tr className="table-header">
                  <td>Sr. no</td>
                  <td>Country</td>
                  <td>Circle</td>
                  <td>Region</td>
                  <td>Division</td>
                  <td>Branch Type</td>
                  <td>Name</td>
                </tr>
                {dataByBranchName.map((el, key) => (
                  <tr className="table-data">
                    <td>{key + 1}.</td>
                    <td>{el.Country}</td>
                    <td>{el.Circle}</td>
                    <td>{el.Region}</td>
                    <td>{el.Division}</td>
                    <td>{el.BranchType}</td>
                    <td>{el.Name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1 className="project-title"> Postal Index Number</h1>
      <div className="pin-container">
        <span className="search-by-desc">
          <div className="search-discription">Search By :</div>
        </span>
        <span className="pin-option">
          <div
            className={`option ${isPinNumber ? "is-selected" : ""}`}
            onClick={() => setPinNumber(true)}
          >
            PIN number
          </div>
          <div
            className={`option ${!isPinNumber ? "is-selected" : ""}`}
            onClick={() => setPinNumber(false)}
          >
            Post Office branch name
          </div>
        </span>
      </div>
      <div className="pin-content">
        {isPinNumber ? byPinNumber() : byPostOfficeBranchName()}
      </div>
    </div>
  );
}
