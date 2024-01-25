// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import NavBar from "./component/NavBar";
import "./App.css";
import iconsearch from "./icons/search-circle.svg";
import trash from "./icons/trash.svg";
import edit from "./icons/edit.svg";
import Vector from "./icons/Vector.svg";
import VectorUp from "./icons/VectorUp.svg";
import axios from "axios";
import WindowPlot from "./component/WindowPlot";

function App() {
  const [customers, setCustomers] = useState([]);
  const [sortToken, setSortToken] = useState("desc");
  const [name, setName] = useState();
  const [showPlot, setShowPlot] = useState(true);
  const [userId, setUserId] = useState();
  const [dataForPlot, setDataForPlot] = useState();
  const [userEmailPlot, setUserEmailForPlot] = useState();

  let timer;
  const Serching = (e) => {
    setName(e.target.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      axios
        .get(
          `https://test.gefara.xyz/api/v1/user/list?page=1&search=${name}&orderBy=tokens%3A${sortToken}`
        )
        .then((response) => setCustomers(response.data.data))
        .catch((error) => console.error("Error fetching data", error));
    }, [1500]);
    console.log(e.target.value);
  };

  const handleSort = () => {
    const newSortToken = sortToken === "asc" ? "desc" : "asc";
    setSortToken(newSortToken);
    clearTimeout(timer);
    timer = setTimeout(async () => {
      axios
        .get(
          `https://test.gefara.xyz/api/v1/user/list?page=1&search=${name}&orderBy=tokens%3A${sortToken}`
        )
        .then((response) => setCustomers(response.data.data))
        .catch((error) => console.error("Error fetching data", error));
    });
  };
  useEffect(() => {
    userId &&
      axios
        .get(`https://test.gefara.xyz/api/v1/user/${userId.id}/transactions`)
        .then((response) => setDataForPlot(response.data))
        .catch((error) => console.error("Error fetching data", error));
    console.log(dataForPlot);
  }, [userId]);
  return (
    <div className="container">
      <NavBar />
      <div className="App">
        <div className="mainOrg">Моя организация</div>
        <div className="line"></div>
        <div className="myUsers">Пользователи</div>
        <div className="mySearchContainer">
          <div className="mySearchContainerinside">
            <img className="icoSearch" src={iconsearch}></img>
            <input type="text" placeholder="поиск" onChange={Serching} />
          </div>
        </div>
        <table className="tablePanel">
          <thead>
            <tr className="firstLine">
              <th>Email</th>
              <th>Имя</th>
              <th>Роль</th>
              <th>Подписка</th>
              <th onClick={handleSort}>
                Токены
                {sortToken === "asc" && <img src={Vector} />}
                {sortToken === "desc" && <img src={VectorUp} />}
              </th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((user) => (
              <tr key={user.id}>
                <td onClick={() => setUserId(user)}>{user.email}</td>
                <td onClick={() => setUserId(user)}>{user.name}</td>
                <td onClick={() => setUserId(user)}>{user.role}</td>
                <td onClick={() => setUserId(user)}>
                  {user.subscription.plan.type}
                </td>
                <td onClick={() => setUserId(user)}>
                  {user.subscription.tokens}
                </td>
                <td>
                  <img src={edit} />
                  <img src={trash} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {userId && dataForPlot && (
        <WindowPlot dataForPlot={dataForPlot} userEmail={userId.email} />
      )}
    </div>
  );
}

export default App;
