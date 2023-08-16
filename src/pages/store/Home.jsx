import React, { useEffect, useState } from "react";
import List from "./List";
import "./home.css";
import Alert from "./Alert";
import { Link, useNavigate } from "react-router-dom";

const getLocal = () => {
  let list = sessionStorage.getItem("list");
  if (list) {
    return JSON.parse(sessionStorage.getItem("list"));
  } else {
    return [];
  }
};

const Home = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocal);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hello");
    if (!name) {
      // display alert
      //   setAlert({ show: true, msg: "Please enter the value", type: "danger" });
      showAlert(true, "danger", "Please Enter Value");
    } else if (name && isEditing) {
      // deal with editing
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      // show alert
      showAlert(true, "success", "item added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specItem.title);
  };

  useEffect(() => {
    sessionStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  //   useEffect(() => {
  //     const timeClear = setTimeout(() => {
  //       setAlert({ show: false, msg: "", type: "" });
  //     }, 3000);
  //     return () => clearTimeout(timeClear);
  //   }, [alert]);
  const navigate = useNavigate();

  return (
    <>
      {/* <Link to="/color" className="bt">
        Find Color
      </Link> */}
      <button className="bt" onClick={() => navigate("/color")}>
        FIND COLOR
      </button>
      <button className="bt" onClick={() => navigate("/model")}>
        GO TO MODEL
      </button>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3>Grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="eg. Colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              Clear Items
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
