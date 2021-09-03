import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";

function Data() {
  const getAllData = () => {
    axios.get(url).then((res) => {
      setItems(res.data.reverse());
      console.log(res.data);
    });
  };
  const renderData = (items) => {
    const notify = () => {
      const customId = "custom-id-yes";

      toast.warn("Post Deleted!", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: customId,
      });
    };

    return (
      <div className="container">
        <ToastContainer limit={1} />
        <div className="row">
          {items.map((item, index) => (
            <div className="col-md-3 dataPost" key={item._id}>
              <h1>{index + 1}</h1>
              <h1>{item.title.substring(0, 40)}</h1>
              <p>{item.des.substring(0, 100)}......</p>
              <p>{item.price}</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteItem(item._id);
                  notify();
                }}
              >
                Delete
              </button>
              <Link to={`/edit/${item._id}`}>
                <button className="btn btn-primary tt">Edit</button>
              </Link>
              <Link to={`/details/${item._id}`}>
                <button
                  className="btn btn-success tt"
                  data-tip
                  data-for="registerTip"
                  data-type="success"
                  delayHide={1000}
                >
                  View Details
                </button>
                <ReactTooltip id="registerTip" place="right" effect="solid">
                  <div>
                    <h1>{item.title}</h1>
                    <p>{item.des}</p>
                  </div>
                </ReactTooltip>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // const [data, setData] = useState([]);

  const [items, setItems] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const url = "http://localhost:8080/allData";

  let history = useHistory();

  useEffect(() => {
    getAllData();
  }, []);

  async function deleteItem(id) {
    await axios.delete("http://localhost:8080/delete/" + id);
    getAllData();
  }

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
      <h1>Todo List</h1> <br />
      {renderData(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
    </>
  );
}

export default Data;
