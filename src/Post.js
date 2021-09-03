import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Post() {
  const notify = () => {
    toast.success("Post Added Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  let history = useHistory();

  // function modeNewpage() {
  //   return history.push("/");
  // }

  const [item, setItems] = useState({
    title: "",
    des: "",
    price: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setItems((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log(item);
  }

  async function addData(event) {
    event.preventDefault();
    const addItem = {
      title: item.title,
      des: item.des,
      price: item.price,
    };

    await axios.post("http://localhost:8080/post", addItem);
    history.push("/");
  }

  return (
    <div className="container">
      <div className="row">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1" class="form-label">
              Title
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="title"
              value={item.title}
              class="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="des"
              value={item.des}
              class="form-control"
            ></input>
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1" class="form-label">
              Price
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="price"
              value={item.price}
              class="form-control"
            ></input>
          </div>
          {/* 
          <button type="submit" class="btn btn-primary btn" onClick={(event)=>{addData(event);modeNewpage()}}>
            Submit
          </button> */}
          <button
            type="submit"
            class="btn btn-primary btn"
            onClick={(event) => {
              addData(event);
              notify();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Post;
