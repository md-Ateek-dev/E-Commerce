import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';

const Leads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lead, setLead] = useState([]);
  const [editLeadId, setEditLeadId] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const [formData, setFormData] = useState({
    Productname: '',
    Price: '',
    ProductImage: '',
    Date: '',
    Description: '',
    Category: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({
        ...formData,
        ProductImage: e.target.files[0],
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editLeadId
        ? `http://localhost:3000/lead/leads/edit/${editLeadId}`
        : `http://localhost:3000/lead/leads/post`;

      const method = editLeadId ? 'put' : 'post';

      const response = await axios[method](url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("formDataToSend:",formData); // Debugging
      console.log("Recieved response:",response); // Debugging

      

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: editLeadId ? 'Product updated successfully' : 'Product saved successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setFormData({
            Productname: '',
            Price: '',
            ProductImage: '',
            Date: '',
            Category: '',
            Description: '',
          });
          setIsModalOpen(false);
          setEditLeadId(null);
          fetchProduct();
         
        });
      }
    } catch (error) {
      console.log('Error saving Product:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to save Product',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  // Fetch products from the backend
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/lead/leads/get`);
      setLead(response.data.leads);
    } catch (error) {
      console.error('Error fetching Product:', error);
      Swal.fire({
        title: 'Error',
        text: error.response ? error.response.data.message : 'Network Error or Server Unreachable',
        icon: 'error',
      });
    }
  };

  // Handle edit button click
  const handleEdit = (leadId) => {
    const leadToEdit = lead.find((item) => item._id === leadId);
    if (leadToEdit) {
      setFormData({
        Productname: leadToEdit.Productname,
        Price: leadToEdit.Price,
        ProductImage: leadToEdit.ProductImage,
        Date: leadToEdit.Date,
        Category: leadToEdit.Category,
        Description: leadToEdit.Description,
      });
      setEditLeadId(leadToEdit._id);
      setIsModalOpen(true);
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/lead/leads/delete/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Product deleted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          fetchProduct();
        });
      }
    } catch (error) {
      console.error('Error deleting Product:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete Product',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Filter Products
  const filteredProducts = lead.filter((lead) => {
    // Ensure the lead object is defined and has the required properties
    if (!lead || !lead.Productname || !lead.Category) {
      return false; // Skip invalid lead objects
    }

    const matchesSearch = lead.Productname.toLowerCase().includes(search.toLowerCase()) ||
                          lead.Category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? lead.Category === category : true;
    return matchesSearch && matchesCategory;
  });

  console.log("Lead data:", lead); // Debugging
  console.log("Filtered products:", filteredProducts); // Debugging

  return (
    <div>
      <div>
        <label>Search Here</label><br />
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Here"
          className="border text-md rounded-md p-1"
        />

        <select
          name="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-md border-1 rounded m-5 p-1"
        >
          <option value="">Choose Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditLeadId(null);
          }}
          className="bg-blue-600 text-xl h-10 rounded-xl text-white px-2 me-5"
        >
          <AddIcon />Product
        </button>
      </div>

      {/* Table for Clients Data */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4 underline">Client Data Table</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-gray-400 text-white">
              <tr>
                <th className="py-3 px-4 text-left border-2 border-black">ProductName</th>
                <th className="py-3 px-4 text-left border-2 border-black">Category</th>
                <th className="py-3 px-4 text-left border-2 border-black">Price</th>
                <th className="py-3 px-4 text-left border-2 border-black">Description</th>
                <th className="py-3 px-4 text-left border-2 border-black">Date</th>
                <th className="py-3 px-4 text-left border-2 border-black">ProductImage</th>
                <th className="py-3 px-4 text-left border-2 border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((lead) => (
                  <tr key={lead._id}>
                    <td className="py-3 px-4 border">{lead.Productname}</td>
                    <td className="py-3 px-4 border">{lead.Category}</td>
                    <td className="py-3 px-4 border">{lead.Price}</td>
                    <td className="py-3 px-4 border">{lead.Description}</td>
                    <td className="py-3 px-4 border">{lead.Date}</td>
                    <td className="py-3 px-4 border">
                      {lead.ProductImage ? (
                        <img
                          src={`http://localhost:3000/uploads/${lead.ProductImage}`}
                          alt={lead.ProductImage}
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="py-3 px-4 border">
                      <button
                        onClick={() => handleEdit(lead._id)}
                        className="bg-orange-600 rounded-md h-10 w-20 text-white m-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="bg-red-600 rounded-md h-10 w-20 text-white m-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              <AddIcon /> {editLeadId ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* ProductName */}
              <div className="mb-4">
                <label>ProductName:</label>
                <input
                  type="text"
                  name="Productname"
                  value={formData.Productname}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* Product Category */}
              <div className="mb-4">
                <label>ProductCategory:</label>
                <select
                  name="Category"
                  value={formData.Category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Choose</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
              {/* Price */}
              <div className="mb-4">
                <label>Price:</label>
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* Description */}
              <div className="mb-4">
                <label>Description:</label>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              {/* Date */}
              <div className="mb-4">
                <label>Date:</label>
                <input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* ProductImage */}
              <div className="mb-4">
                <label>ProductImage:</label>
                <input
                  type="file"
                  name="ProductImage"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                  required={!editLeadId}
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-4 w-40 m-2 bg-blue-600 text-white py-2 rounded-md"
                >
                  {editLeadId ? 'Update' : 'Save'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-40 m-2 bg-gray-600 text-white py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;