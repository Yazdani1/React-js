import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";


function Details() {
  const [items, setItems] = useState([]);
  const url = "http://localhost:8080/edit/";

  let { id } = useParams();
  let history = useHistory();

  const getAllData = async () => {
    await axios.get(url + id).then((res) => {
      setItems(res.data);
     
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="detailss">
      <h1>{items.title}</h1>
      <p>{items.des}</p>
      <h1>{items.price}</h1>
  
        <button className="btn btn-success tt" onClick={()=>history.push('/')}>Back</button>
    
    </div>
  );
}

export default Details;
