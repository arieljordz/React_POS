import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ActiveMenu from "../custom/ActiveMenu";
import Layout from "./Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

function Products() {
  const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));
  const [getProducts, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("Add");

  const pageCount = Math.ceil(getProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const filteredItems = getProducts.filter((obj) =>
    obj.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItemsOnPage = filteredItems.slice(offset, offset + itemsPerPage);

  const initialFormData = {
    Id: 0,
    Description: "",
    Details: {
      Quantity: "",
      Price: "",
      ExpirationDate: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchProducts = async () => {
    setisLoading(true);
    const res = await axios.get("https://localhost:7182/GetProducts");
    setProducts(await res.data);
    setisLoading(false);
  };

  const fetchProductById = async (Id) => {
    try {
      const res = await axios.get(
        "https://localhost:7182/GetProductById/" + Id
      );
      const product = res.data;
      const getFormData = {
        Id: product[0].id,
        Description: product[0].description,
        Details: {
          Quantity: product[0].details.quantity,
          Price: product[0].details.price,
          ExpirationDate: product[0].details.expirationDate,
        },
      };
      setFormData(getFormData);
    } catch (error) {
      console.log(error);
    }
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setMode("Add");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(mode);
      console.log(formData.Id);
      const res = await axios.post("https://localhost:7182/PostProduct", formData, {
        params: {
          userId,
        },
      });
      console.log(res.status);
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
          fetchProducts();
        }, 1000);
      } else {
        toast.error("Error in saving product details.", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
        });
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error in saving product details. with status = " + error.response.status, {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
        closeButton: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleButtonActions = (action, Id) => {
    if (action === "update") {
      setShowModal(true);
      setMode("Update");
      fetchProductById(Id);
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
          .delete("https://localhost:7182/DeleteProductById", {
            params: {
              Id,
              userId,
            },
          },)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Successfully deleted.", {
                autoClose: 2000,
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
              });
              setTimeout(() => {
                fetchProducts();
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

  useEffect(() => {
    ActiveMenu("products");
    ActiveMenu("manage");
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Products</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="">Products</a>
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
                <i className="fa fa-shopping-bag pr-2" />
                Product Details
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
                              {/* <th className="sorting text-center">ID</th> */}
                              <th className="sorting text-center">
                                Description
                              </th>
                              <th className="sorting text-center">Quantity</th>
                              <th className="sorting text-center">Price</th>
                              <th className="sorting text-center">Date</th>
                              <th className="sorting text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItemsOnPage.length > 0 ? (
                              currentItemsOnPage.map((obj, key) => (
                                <tr key={key}>
                                  {/* <td className="dtr-control sorting_1 text-center">
                                    {obj.id}
                                  </td> */}
                                  <td className="dtr-control sorting_1 text-center">
                                    {obj.description}
                                  </td>
                                  <td className="dtr-control sorting_1 text-center">
                                    {obj.details.quantity}
                                  </td>
                                  <td className="dtr-control sorting_1 text-center">
                                    {Number(obj.details.price).toFixed(2)}
                                  </td>
                                  <td className="dtr-control sorting_1 text-center">
                                    {obj.details.expirationDate &&
                                      new Date(
                                        obj.details.expirationDate
                                      ).toLocaleDateString("en-US")}
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
                      {mode} Product
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
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <div htmlFor="Description">Description</div>
                          <input
                            type="text"
                            name="Description"
                            className="form-control"
                            id="Description"
                            autoComplete="off"
                            required="required"
                            value={formData.Description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="Quantity">Quantity</div>
                          <input
                            type="number"
                            name="Details.Quantity"
                            className="form-control"
                            id="Quantity"
                            required="required"
                            value={formData.Details.Quantity}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="Price">Price</div>
                          <input
                            type="text"
                            name="Details.Price"
                            className="form-control"
                            id="Price"
                            required="required"
                            value={formData.Details.Price}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                          <div htmlFor="ExpirationDate">Expiration Date</div>
                          <input
                            type="date"
                            name="Details.ExpirationDate"
                            className="form-control"
                            id="ExpirationDate"
                            required="required"
                            value={
                              formData.Details.ExpirationDate
                                ? formData.Details.ExpirationDate.substring(
                                    0,
                                    10
                                  )
                                : ""
                            }
                            onChange={handleChange}
                          />
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

export default Products;
