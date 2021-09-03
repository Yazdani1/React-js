import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {useHistory,useParams} from "react-router-dom";

function Edit() {

    let history = useHistory();

    let {id} = useParams();

    const url="http://localhost:8080/edit/";


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

    await axios.put("http://localhost:8080/editData/"+id, addItem);
    history.push('/');
  }

  //set edit data to the input field

  useEffect(() => {
     axios.get(url+id).then(res=>{
         setItems(res.data);
     });
  }, [])


// const loadData = async()=>{
//     const result = await axios.get("http://localhost:8080/edit/"+id);
//     setItems(result.data);
// }


  return (
    <div className="container">
        <h1>Update Post</h1>
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
          <button type="submit" className="btn btn-primary btn" onClick={addData}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
export default Edit;
