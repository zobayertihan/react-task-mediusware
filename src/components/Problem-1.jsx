import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, { name, status }]);
    setName("");
    setStatus("");
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a.status === "Active" && b.status !== "Active") {
        return -1; // Move Active tasks to the front
      } else if (a.status !== "Active" && b.status === "Active") {
        return 1; // Move Active tasks to the front
      } else if (a.status === "Completed" && b.status !== "Completed") {
        return -1; // Move Completed tasks after Active tasks
      } else if (a.status !== "Completed" && b.status === "Completed") {
        return 1; // Move Completed tasks after Active tasks
      } else {
        return 0; // Keep the same order for other statuses
      }
    });
  };

  const filterData = () => {
    if (show === "all") {
      return sortData(data);
    } else if (show === "active") {
      return sortData(data.filter((item) => item.status === "Active"));
    } else if (show === "completed") {
      return sortData(data.filter((item) => item.status === "Completed"));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData().map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
