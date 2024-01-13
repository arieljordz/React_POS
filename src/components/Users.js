import React, { useEffect, useState } from "react";
import ActiveMenu from "../custom/ActiveMenu";
import Layout from "./Layout";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

function Users() {
  const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("Add");
  const [getUsers, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const pageCount = Math.ceil(getUsers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const filteredItems = getUsers.filter((obj) =>
    obj.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItemsOnPage = filteredItems.slice(offset, offset + itemsPerPage);

  const initialFormData = {
    Id: 0,
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Username: "",
    Password: "",
    UserTypeId: 1,
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchUsers = async () => {
    setisLoading(true);
    const res = await axios.get("https://localhost:7182/GetUsers");
    setUsers(await res.data);
    setisLoading(false);
    //console.log(res.data);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const Pagination = (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      activeClassName="active"
    />
  );

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      const res = await axios.post(
        "https://localhost:7182/PostUser",
        formData,
        {
          params: {
            userId,
          },
        }
      );
      //console.log(res);
      if (res.status === 200) {
        if (mode === "Add") {
          toast.success("Successfully saved.", {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
          });
        } else {
          toast.success("Successfully updated.", {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
          });
          setShowModal(false);
        }

        setFormData(initialFormData);
        setTimeout(() => {
          fetchUsers();
        }, 1000);
      } else {
        toast.error("Error in saving User details.", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
        });
      }
    } catch (error) {
      console.log(error.response);
      toast.error(
        "Error in saving User details. with status = " + error.response.status,
        {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
        }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchUserById = async (Id) => {
    try {
      const res = await axios.get("https://localhost:7182/GetUserById/" + Id);
      const user = res.data;
      console.log(user);
      const getFormData = {
        Id: user[0].id,
        FirstName: user[0].firstName,
        MiddleName: user[0].middleName,
        LastName: user[0].lastName,
        Username: user[0].username,
        Password: user[0].password,
        UserTypeId: user[0].userTypeId,
      };
      setFormData(getFormData);
      console.log(getFormData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonActions = (action, Id) => {
    if (action === "update") {
      setShowModal(true);
      setMode("Update");
      fetchUserById(Id);
    } else if (action === "delete") {
      handleDelete(Id);
    }
  };

  const handleDelete = (Id) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this record?",
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, Delete it",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete("https://localhost:7182/DeleteUserById", {
            params: {
              Id,
              userId,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Successfully deleted.", {
                autoClose: 2000,
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
              });
              setTimeout(() => {
                fetchUsers();
              }, 1500);
            } else {
              toast.error("Error while deleting product.", {
                autoClose: 2000,
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
              });
            }
          })
          .catch((error) => {
            toast.error("Error while deleting product.", {
              autoClose: 2000,
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //console.log("Cancelled");
      }
    });
  };

  const getUserTypes = async () => {
    try {
      const res = await axios.get("https://localhost:7182/GetUserTypes");
      //console.log(res);
      setOptions(await res.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    ActiveMenu("users");
    ActiveMenu("manage");
    getUserTypes();
    fetchUsers();
  }, []);
  return (
    <Layout>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Users</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="">Users</a>
                </li>
                <li className="breadcrumb-item active">Manage</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row pl-2 pb-3">
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#modal-default"
              onClick={handleShowModal}
            >
              <i className="fa fa-plus mr-2" />
              Add New
            </button>
          </div>
          <div className="card card-secondary">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fa fa-user pr-2" />
                User Details
              </h3>
            </div>
            <div className="card-body">
              <div className="pb-3">
                <input
                  type="text"
                  className="form-control col-xs-3 col-sm-3 col-md-3 col-lg-3"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search Product"
                />
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {isLoading ? (
                    "Loading..."
                  ) : (
                    <div>
                      <div className="dataTables_wrapper table-responsive dt-bootstrap4">
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                          role="grid"
                          aria-describedby="example2_info"
                        >
                          <thead className="bg-secondary">
                            <tr role="row">
                              <th className="sorting text-center">FullName</th>
                              <th className="sorting text-center">Username</th>
                              {/* <th className="sorting text-center">Password</th> */}
                              <th className="sorting text-center">
                                User Type
                              </th>
                              <th className="sorting text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItemsOnPage.length > 0 ? (
                              currentItemsOnPage.map((obj, key) => (
                                <tr key={key}>
                                  <td className="dtr-control sorting_1 text-center">
                                    {obj.fullName}
                                  </td>
                                  <td className="dtr-control sorting_1 text-center">
                                    {obj.username}
                                  </td>
                                  {/* <td className="dtr-control sorting_1 text-center">
                                    {obj.password}
                                  </td> */}
                                  <td className="dtr-control sorting_1 text-center">
                                    {obj.userTypeId === 1
                                      ? "Manager"
                                      : "Cashier"}
                                  </td>
                                  <td className="dtr-control sorting_1 text-center">
                                    <div className="row justify-content-center">
                                      <div className="dropdown dropleft">
                                        <button
                                          id="btnbars"
                                          type="button"
                                          className="btn btn-sm btn-primary btnbars"
                                          data-toggle="dropdown"
                                        >
                                          <i className="fa fa-bars" />
                                        </button>
                                        <div className="dropdown-menu">
                                          <div className="container fluid">
                                            <div className="pb-1">
                                              <button
                                                id="btnUpdate"
                                                type="button"
                                                className="btn btn-warning btn-sm col-sm-12"
                                                onClick={() =>
                                                  handleButtonActions(
                                                    "update",
                                                    obj.id
                                                  )
                                                }
                                              >
                                                <i className="fa fa-edit mr-2" />
                                                Update
                                              </button>
                                            </div>
                                            <div className="">
                                              <button
                                                id="btnDelete"
                                                type="button"
                                                className="btn btn-danger btn-sm col-sm-12"
                                                onClick={() =>
                                                  handleButtonActions(
                                                    "delete",
                                                    obj.id
                                                  )
                                                }
                                              >
                                                <i className="fa fa-trash mr-2" />
                                                Delete
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6}></td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            {Pagination}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
      <ToastContainer />
      <div>
        {showModal && (
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            id="modal-default"
            style={{ display: showModal ? "block" : "none" }}
            aria-hidden={!showModal}
            role="dialog"
            data-backdrop="static"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header bg-dark">
                    <h5 className="modal-title">
                      <i className="fa fa-shopping-bag pr-2"></i>
                      {mode} User
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseModal}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="hidden"
                      id="Id"
                      value={formData.Id}
                      onChange={handleChange}
                    />
                    <div className="row">
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="FirstName">FirstName</div>
                          <input
                            type="text"
                            name="FirstName"
                            className="form-control"
                            id="FirstName"
                            autoComplete="off"
                            required="required"
                            value={formData.FirstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="MiddleName">MiddleName</div>
                          <input
                            type="text"
                            name="MiddleName"
                            className="form-control"
                            id="MiddleName"
                            required="required"
                            value={formData.MiddleName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="LastName">LastName</div>
                          <input
                            type="text"
                            name="LastName"
                            className="form-control"
                            id="LastName"
                            required="required"
                            value={formData.LastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="Username">Username</div>
                          <input
                            type="text"
                            name="Username"
                            className="form-control"
                            id="Username"
                            required="required"
                            value={formData.Username}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="Password">Password</div>
                          <input
                            type="password"
                            name="Password"
                            className="form-control"
                            id="Password"
                            required="required"
                            value={formData.Password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="UserType">User Type</div>
                          <select
                            value={formData.UserTypeId}
                            className="form-control"
                            name="UserTypeId"
                            onChange={handleChange}
                          >
                            {options.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.description}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-secondary float-right"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Users;
