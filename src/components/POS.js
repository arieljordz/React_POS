import React, { useEffect, useRef, useState } from "react";
import ActiveMenu from "../custom/ActiveMenu";
import axios from "../api/axios";
import Layout from "./Layout";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateNow from "../custom/DateNow";
import { useReactToPrint } from "react-to-print";

function POS() {
  const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));
  const [totalAmount, setTotalAmount] = useState(0);
  const [change, setChange] = useState(0);
  const [getProducts, setProducts] = useState([]);
  const [getOrders, setOrders] = useState([]);
  const [getSales, setSales] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [dateNow, setdateNow] = useState("");
  const [amountPaid, setAmountPaid] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [VAT, setVAT] = useState(0.0);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalReceipt, setShowModalReceipt] = useState(false);

  const initialFormOrder = {
    Id: 0,
    UserId: 0,
    ProductId: 0,
    Description: "",
    Quantity: 0,
  };

  const initialFormSales = {
    Id: 0,
    UserId: userId,
    TotalAmount: 0,
    AmountPaid: "",
  };

  const [formOrder, setFormOrder] = useState(initialFormOrder);
  const [formSales, setFormSales] = useState(initialFormSales);

  const pageCount = Math.ceil(getProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const filteredItems = getProducts.filter((obj) =>
    obj.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItemsOnPage = filteredItems.slice(offset, offset + itemsPerPage);

  const fetchProducts = async () => {
    setisLoading(true);
    const res = await axios.get("https://localhost:7182/GetProducts");
    setProducts(await res.data);
    setisLoading(false);
  };

  const fetchOrdersById = async (Id) => {
    const res = await axios.get(
      "https://localhost:7182/GetOrderByUserId/" + Id
    );
    setOrders(await res.data);
  };

  const fetchProductById = async (Id) => {
    try {
      const res = await axios.get(
        "https://localhost:7182/GetProductById/" + Id
      );
      const product = res.data;
      //console.log(product[0].description);
      const getFormOrder = {
        userId: userId,
        ProductId: product[0].id,
        Description: product[0].description,
        Quantity: product[0].details.quantity,
      };
      setFormOrder(getFormOrder);
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

  const handleDoubleClick = (e, rowData, index) => {
    setSelectedRow(index);
    console.log(rowData);
    setShowModal(true);
    fetchProductById(rowData.id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalReceipt(false);
  };

  const handleChangeOrder = (e) => {
    const { name, value } = e.target;
    setFormOrder((prevFormOrder) => ({
      ...prevFormOrder,
      [name]: value,
    }));
  };

  const handleChangeSales = (e) => {
    const { name, value } = e.target;
    setFormSales((prevFormSales) => ({
      ...prevFormSales,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://localhost:7182/PostOrder",
        formOrder
      );
      //console.log(res.status);
      if (res.status === 200) {
        toast.success("Successfully added to cart.", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
        });
        setShowModal(false);
        fetchOrdersById(userId);
      } else {
        toast.error("Error in saving quantity.", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
        });
      }
    } catch (error) {
      console.log(error.response);
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
          .delete("https://localhost:7182/DeleteOrderById/" + Id)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Successfully deleted.", {
                autoClose: 2000,
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
              });
              fetchOrdersById(userId);
            } else {
              toast.error("Error while deleting order.", {
                autoClose: 2000,
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
              });
            }
          });
        setTotalAmount(0);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (getOrders.length !== 0) {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to checkout this items?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Yes, Checkout it out",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setTotalAmount(
            getOrders.reduce((total, obj) => total + Number(obj.subtotal), 0)
          );
          const res = await axios.post(
            "https://localhost:7182/Checkout/" + userId
          );
          if (res.status === 200) {
            toast.success("Cart has been checkout.", {
              autoClose: 2000,
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
            });
            fetchOrdersById(userId);
            const getFormSales = {
              Id: 0,
              UserId: userId,
              TotalAmount: getOrders.reduce(
                (total, obj) => total + Number(obj.subtotal),
                0
              ),
              AmountPaid: "",
            };
            setFormSales(getFormSales);
            fetchProducts();
            //console.log(getFormSales);
          } else {
            toast.error("Checkout error.", {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
    } else {
      toast.error("Add items to the cart first.", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        closeButton: true,
      });
    }
  };

  const fetchSalesById = async (Id) => {
    const res = await axios.get(
      "https://localhost:7182/GetReceiptBySalesId/" + Id
    );
    setSales(await res.data);
    const _dateNow = new Date(res.data[0].dateInvoiced);
    setdateNow(_dateNow);
    setAmountPaid(res.data[0].amountPaid);
    setChange(res.data[0].change);
    setDiscount(res.data[0].discount);
    setVAT(res.data[0].VAT);
    //console.log(_dateNow);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    console.log(totalAmount);
    if (totalAmount !== 0) {
      try {
        const res = await axios.post(
          "https://localhost:7182/PostSales",
          formSales
        );
        //console.log(res.status);
        console.log(res.data);
        if (res.status === 200) {
          fetchSalesById(res.data.id);
          setShowModalReceipt(true);
          toast.success("Order has been placed.", {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
          });
          setFormSales(initialFormSales);
          setTotalAmount(0);
        } else {
          toast.error(res.data, {
            autoClose: 5000,
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      toast.error("You don't have checkout items.", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        closeButton: true,
      });
    }
  };

  const handleKeyDown = (e) => {
    const key = e.keyCode || e.which;
    const allowedKeys = [
      8, // Backspace
      9, // Tab
      37, // Left arrow
      39, // Right arrow
      46, // Delete
      190, // period
      110, // period in numeric keypad
    ];

    if (
      !(
        (key >= 48 && key <= 57) || // Numbers on top of the keyboard
        (key >= 96 && key <= 105) || // Numbers on the numeric keypad
        allowedKeys.includes(key)
      )
    ) {
      e.preventDefault();
    }
  };

  const handleKeyUp = (e) => {
    let { value } = e.target;
    setChange(value - totalAmount);
  };

  const handleOnBlur = (e) => {
    let { value } = e.target;
    const regex = /^\d+(\.\d{0,2})?$/;

    if (!regex.test(value)) {
      e.target.value = "";
    } else {
      const parts = value.split(".");
      if (parts.length === 1) {
        // Add two decimal places for whole numbers
        value = `${value}.00`;
      } else if (parts[1].length === 1) {
        // Add one decimal place if only one is entered
        value = `${value}0`;
      }
      e.target.value = value;
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Receipt",
  });

  useEffect(() => {
    ActiveMenu("pos");
    fetchProducts();
    fetchOrdersById(sessionStorage.getItem("UserId"));
  }, []);

  return (
    <Layout>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Point of Sale</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="">Transaction</a>
                </li>
                <li className="breadcrumb-item active">Point of Sale</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-shopping-bag pr-2" />
                    Product List
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
                                  <th className="sorting text-center">
                                    Description
                                  </th>
                                  <th className="sorting text-center">
                                    Quantity
                                  </th>
                                  <th className="sorting text-center">Price</th>
                                  <th className="sorting text-center">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItemsOnPage.length > 0 ? (
                                  currentItemsOnPage.map((obj, key) => (
                                    <tr
                                      key={key}
                                      onClick={(event) =>
                                        handleDoubleClick(event, obj, key)
                                      }
                                      className={
                                        selectedRow === key ? "dtactive" : ""
                                      }
                                    >
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
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td className="text-center" colSpan={5}>
                                      No data available
                                    </td>
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
          </div>
          <div className="row">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-cart-arrow-down pr-2" />
                    Cart
                  </h3>
                </div>
                <div className="card-body">
                  <div className="dataTables_wrapper table-responsive dt-bootstrap4">
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                      role="grid"
                      aria-describedby="example2_info"
                    >
                      <thead className="bg-secondary">
                        <tr role="row">
                          <th className="sorting text-center">Description</th>
                          <th className="sorting text-center">Quantity</th>
                          <th className="sorting text-center">Subtotal</th>
                          <th className="sorting text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getOrders.length > 0 ? (
                          <>
                            {getOrders.map((obj, index) => (
                              <tr key={index}>
                                <td className="dtr-control sorting_1 text-center">
                                  {obj.description}
                                </td>
                                <td className="dtr-control sorting_1 text-center">
                                  {obj.quantity}
                                </td>
                                <td className="dtr-control sorting_1 text-center">
                                  {Number(obj.subtotal).toFixed(2)}
                                </td>
                                <td className="dtr-control sorting_1 text-center">
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(obj.id)}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td
                                className="dtr-control sorting_1 text-right"
                                colSpan={2}
                              >
                                Total:
                              </td>
                              <td className="dtr-control sorting_1 text-center">
                                {getOrders
                                  .reduce(
                                    (total, obj) =>
                                      total + Number(obj.subtotal),
                                    0
                                  )
                                  .toFixed(2)}
                              </td>
                              <td
                                className="dtr-control sorting_1 text-center"
                                colSpan={1}
                              ></td>
                            </tr>
                          </>
                        ) : (
                          <tr>
                            <td className="text-center" colSpan={4}>
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="modal-footer justify-content-end p-0">
                    <button
                      type="submit"
                      onClick={handleCheckout}
                      className="btn btn-secondary float-right"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <form onSubmit={handlePlaceOrder}>
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-cart-plus pr-2" />
                      Place Order
                    </h3>
                  </div>
                  <div className="card-body">
                    <input
                      type="hidden"
                      id="UserId"
                      name="UserId"
                      value={userId}
                    />
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <div htmlFor="TotalAmount">Total Amount</div>
                        <input
                          type="text"
                          name="TotalAmount"
                          className="form-control text-right"
                          id="TotalAmount"
                          required="required"
                          value={Number(totalAmount).toFixed(2)}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <div htmlFor="Discount">Discount</div>
                        <input
                          type="text"
                          name="Discount"
                          className="form-control text-right"
                          id="Discount"
                          placeholder="0.00"
                          readOnly={true}
                          onChange={handleChangeSales}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <div htmlFor="AmountPaid">Amount Paid</div>
                        <input
                          type="text"
                          name="AmountPaid"
                          className="form-control text-right"
                          id="AmountPaid"
                          required="required"
                          placeholder="0.00"
                          value={formSales.AmountPaid}
                          onChange={handleChangeSales}
                          onKeyDown={handleKeyDown}
                          onKeyUp={handleKeyUp}
                          onBlur={handleOnBlur}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <div htmlFor="Change">Change</div>
                        <input
                          type="text"
                          name="Change"
                          className="form-control text-right"
                          id="Change"
                          placeholder="0.00"
                          value={Number(change).toFixed(2)}
                          readOnly={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="modal-footer justify-content-end p-0">
                      <button
                        type="submit"
                        className="btn btn-secondary float-right"
                      >
                        Placer Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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
                      Add Quantity
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
                      id="ProductId"
                      name="ProductId"
                      value={formOrder.ProductId}
                      onChange={handleChangeOrder}
                    />
                    <input
                      type="hidden"
                      id="UserId"
                      name="UserId"
                      value={userId}
                    />
                    <div className="row">
                      <div className="col-8">
                        <div className="form-group">
                          <div htmlFor="Description">Description</div>
                          <input
                            type="text"
                            name="Description"
                            className="form-control"
                            id="Description"
                            required="required"
                            readOnly="{true}"
                            value={formOrder.Description}
                            onChange={handleChangeOrder}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <div htmlFor="Quantity">Quantity</div>
                          <input
                            type="number"
                            name="Quantity"
                            className="form-control"
                            id="Quantity"
                            required="required"
                            onChange={handleChangeOrder}
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
                      Add to Cart
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        {showModalReceipt && (
          <div
            className={`modal fade ${showModalReceipt ? "show" : ""}`}
            id="modal-default"
            style={{ display: showModalReceipt ? "block" : "none" }}
            aria-hidden={!showModalReceipt}
            role="dialog"
            data-backdrop="static"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-dark">
                  <h5 className="modal-title">
                    <i className="fa fa-file pr-2"></i>
                    Receipt
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
                <div className="modal-body p-0">
                  <div className="custom-print-layout" ref={componentRef}>
                    <section className="p-4">
                      <div className="row justify-content-center">
                        <label>Official Receipt</label>
                      </div>
                      <div className="row justify-content-center">
                        <span>Jordz Production</span>
                      </div>
                      <div className="row justify-content-center">
                        <span>Poblacion, Sto. Nino, South Cotabato</span>
                      </div>
                      <div className="row justify-content-center">
                        <span>0915-123-4567</span>
                      </div>
                    </section>
                    <section className="pl-4 pr-4">
                      <div className="dataTables_wrapper table-responsive dt-bootstrap4">
                        <table
                          id="example2"
                          className="table table-bordered table-sm"
                          role="grid"
                          aria-describedby="example2_info"
                        >
                          <thead className="">
                            <tr role="row">
                              <th className="sorting text-center">
                                Description
                              </th>
                              <th className="sorting text-center">Quantity</th>
                              <th className="sorting text-center">Price</th>
                              <th className="sorting text-center">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getSales.length > 0 ? (
                              <>
                                {getSales.map((obj, index) => (
                                  <tr key={index}>
                                    <td className="dtr-control sorting_1 text-center">
                                      {obj.description}
                                    </td>
                                    <td className="dtr-control sorting_1 text-center">
                                      {obj.quantity}
                                    </td>
                                    <td className="dtr-control sorting_1 text-center">
                                      {Number(obj.price).toFixed(2)}
                                    </td>
                                    <td className="dtr-control sorting_1 text-center">
                                      {Number(obj.subtotal).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                                <tr>
                                  <td
                                    className="dtr-control sorting_1 text-right"
                                    colSpan={3}
                                  >
                                    Total:
                                  </td>
                                  <td className="dtr-control sorting_1 text-center">
                                    {getSales
                                      .reduce(
                                        (total, obj) =>
                                          total + Number(obj.subtotal),
                                        0
                                      )
                                      .toFixed(2)}
                                  </td>
                                </tr>
                              </>
                            ) : (
                              <tr>
                                <td className="text-center" colSpan={4}>
                                  No data available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </section>
                    <section className="pl-4 pr-4 pb-4">
                      <div className="row justify-content-between">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-bold">
                          AmountPaid:
                          <span className="pl-2">
                            {Number(amountPaid).toFixed(2)}
                          </span>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-bold">
                          Discount:
                          <span className="pl-2">
                            {Number(discount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="row justify-content-between">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-bold">
                          Change:
                          <span className="pl-2">
                            {Number(change).toFixed(2)}
                          </span>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-bold">
                          VAT:
                          <span className="pl-2">
                            {Number(discount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </section>
                    <section className="pl-4 pr-4 pb-4">
                      <div className="row justify-content-center">
                        Thank You!
                      </div>
                      <div className="row justify-content-center">
                        Copyright © 2023 Jordz Production. All rights reserved.
                      </div>
                      <div className="row justify-content-center text-bold">
                        Date Invoiced:{" "}
                        <span className="pl-2">
                          <DateNow />
                        </span>{" "}
                      </div>
                    </section>
                  </div>
                </div>
                <div className="modal-footer justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-secondary float-right"
                    onClick={handlePrint}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default POS;
