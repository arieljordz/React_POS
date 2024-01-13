import React, { useEffect, useState } from "react";
import ActiveMenu from "../custom/ActiveMenu";
import Layout from "./Layout";
import axios from "../api/axios";
import ReactPaginate from "react-paginate";

function Inv_Sales() {
  const [productId, setProductId] = useState(0);
  const [DateFrom, setDateFrom] = useState("01-01-2020");
  const [DateTo, setDateTo] = useState("01-01-2100");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [formData, setFormData] = useState({
    Product: selectedOption,
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [getProducts, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const pageCount = Math.ceil(getProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const filteredItems = getProducts.filter((obj) =>
    obj.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItemsOnPage = filteredItems.slice(offset, offset + itemsPerPage);

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

  const GetSalesByDateInvoiced = async (Id, DateFrom, DateTo) => {
    try {
      const res = await axios.get(
        "https://localhost:7182/GetSalesByDateInvoiced?Id=" +
          Id +
          "&DateFrom=" +
          DateFrom +
          "&DateTo=" +
          DateTo
      );
      console.log(res.data);
      setProducts(await res.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const getProductList = async () => {
    try {
      const res = await axios.get("https://localhost:7182/GetProducts");
      //console.log(res);
      setOptions(await res.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionId = e.target.options[selectedIndex].getAttribute("id");
    console.log(e.target);
    console.log(value);
    console.log(selectedOptionId);
    setProductId(selectedOptionId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangeFrom = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    console.log(value);
    setDateFrom(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeTo = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    console.log(value);
    setDateTo(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFetchProduct = async (e) => {
    e.preventDefault();
    if (productId == null) {
      GetSalesByDateInvoiced(0, DateFrom, DateTo);
    } else {
      GetSalesByDateInvoiced(productId, DateFrom, DateTo);
    }
    console.log(productId, DateFrom, DateTo);
  };
  useEffect(() => {
    ActiveMenu("inventory");
    ActiveMenu("sales_inventory");
    getProductList();
    GetSalesByDateInvoiced(0, DateFrom, DateTo);
  }, []);
  return (
    <Layout>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Sales Inventory</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="">Sales</a>
                </li>
                <li className="breadcrumb-item active">Home</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-secondary">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fa fa-user pr-2" />
                Sales Details
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <div className="card card-secondary">
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fa fa-shopping-bag pr-2" />
                        Filter
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <div>Product Name</div>
                        <select
                          value={formData.Product}
                          className="form-control"
                          name="Product"
                          onChange={handleChange}
                        >
                          <option value="All">All</option>
                          {options.map((option) => (
                            <option
                              key={option.id}
                              id={option.id}
                              value={option.description}
                            >
                              {option.description}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <div htmlFor="DateFrom">Date From</div>
                        <input
                          type="date"
                          name="DateFrom"
                          className="form-control"
                          id="DateFrom"
                          onChange={handleChangeFrom}
                        />
                      </div>
                      <div className="form-group">
                        <div htmlFor="DateTo">Date To</div>
                        <input
                          type="date"
                          name="DateTo"
                          className="form-control"
                          id="DateTo"
                          onChange={handleChangeTo}
                        />
                      </div>
                      <div className="d-flex justify-content-end p-0">
                        <button
                          type="submit"
                          onClick={handleFetchProduct}
                          className="btn btn-secondary float-right"
                        >
                          Fetch
                        </button>
                      </div>
                    </div>
                    <div className="card-footer"></div>
                  </div>
                </div>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
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
                            <th className="sorting text-center">Description</th>
                            <th className="sorting text-center">Sold</th>
                            <th className="sorting text-center">Subtotal</th>
                            <th className="sorting text-center">
                              Date Invoiced
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItemsOnPage.length > 0 ? (
                            currentItemsOnPage.map((obj, key) => (
                              <tr key={key}>
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
                                  {obj.dateInvoiced &&
                                    new Date(
                                      obj.dateInvoiced
                                    ).toLocaleDateString("en-US")}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6}></td>
                            </tr>
                          )}
                          <tr>
                            <td
                              className="dtr-control sorting_1 text-right"
                              colSpan={2}
                            >
                              Total:
                            </td>
                            <td className="dtr-control sorting_1 text-center">
                              {currentItemsOnPage
                                .reduce(
                                  (total, obj) => total + Number(obj.subtotal),
                                  0
                                )
                                .toFixed(2)}
                            </td>
                            <td
                              className="dtr-control sorting_1 text-right"
                              colSpan={1}
                            ></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          {Pagination}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Inv_Sales;
