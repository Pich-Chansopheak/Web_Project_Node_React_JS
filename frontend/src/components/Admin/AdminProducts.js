import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios, { Axios } from 'axios';
import { useContext } from 'react';
import { Store } from '../Products/Store';
import LoadingBox from '../MessageBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Pagination from './Pagination';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        adminpro: action.payload.adminpro,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AdminProducts(){

  const [{ loading, error, adminpro }, dispatch] = useReducer(reducer, {
    adminpro: [],
    loading: true,
    error: '',
  });

//pagination
  const [currentPage,setCurrentPage] = useState(1);

  const [postsPerPage,setPostsPerPage] = useState(3);
//Get Current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProd = adminpro.slice(indexOfFirstPost,indexOfLastPost);
//Change page
// pageNumber get from number in Pagination
const paginate = pageNumber => setCurrentPage(pageNumber);
//End of pagination
 
//Add New Product Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //Set Products value
  const[name,setName] =useState('');
  const[slug,setSlug] =useState('');
  const[image,setImage] =useState({});
  const[brand,setBrand] =useState('');
  const[category,setCategory] =useState('');
  const[countInstock,setCountInstock] =useState(0);
  const[description,setDescription] =useState('');
  const[price,setPrice] =useState(0);
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { productInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/products/postpro', {
        name,
        slug,
        image,
        brand,
        category,
        countInstock,
        description,
        price,
      });
      ctxDispatch({ type: 'ADD_PRODUCT', payload: data });
      localStorage.setItem('productInfo',JSON.stringify(data));
      alert("File Upload success");
      //fetchDate is a funtion that we use to fetch product date,
      // so when we use it here it will reload page and reload product
      fetchData();
      handleClose();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //upload image
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const base64= await convertToBase64(file);
    setImage(base64);
  };

  const deleteProduct = async (id) => {
       let result = await fetch(`/api/products/${id}`,{
        method:"Delete"
       });
       result =await result.json();
       if(result){
        alert("Product Have Been Deleted Successfully.");
        fetchData();
       }
  };
  //get all product to display
  const fetchData = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const result = await axios.get('/api/products/adminpro');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 


  return (
      <div className="row mt-5 gx-0">
        <div className="col-12 col-md-2 pr-0 ">
            <Sidebar/>
        </div>
        <div className='container'>
          <div className="col-12 col-md-12 m-0">
            <h1 className="my-4">Product</h1>
            {/*"Add product" Modal*/}
            <Button type ='button' onClick={handleShow} className='btn btn-primary float-right mb-2 '>
                  <i className="fa-solid fa-plus"></i>  Add New Product
            </Button>
            <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Product Name: </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="slug">
                          <Form.Label>Slug: </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setSlug(e.target.value)} 
                          />
                        </Form.Group>
                      <Form.Group className="mb-3" controlId="image">
                          <Form.Label>Image: </Form.Label>
                          <Form.Control
                            type="file"
                            accept='.jpg,.png,.jpeg'
                            onChange={handleImgUpload} 
                          />
                            
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="brand">
                          <Form.Label>Brand: </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setBrand(e.target.value)} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                          <Form.Label>Category: </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setCategory(e.target.value)} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="countInstock">
                          <Form.Label>Quantity: </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setCountInstock(e.target.value)} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                          <Form.Label>Description: </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setDescription(e.target.value)} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                          <Form.Label>Price: </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setPrice(e.target.value)} 
                          />
                        </Form.Group>

                      </Form>
                      
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button type="submit" variant="success" onClick={submitHandler}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </> 
          
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <table className="table admin">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>BRAND</th>
                    <th>CATEGORIES</th>
                    <th>QUANTITY</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProd.map((adproduct,i) => (
                    <tr key={adproduct._id}>
                      <td>{currentPage===1? i+1 :i+1+((currentPage-1)*postsPerPage)}</td>
                      <td className='admin'>
                        <img className='img-small-thumbnail' src={adproduct.image} alt={adproduct.name}></img> 
                      </td>
                      <td>{adproduct.name}</td>
                      <td>{adproduct.brand}</td>
                      <td>{adproduct.category}</td>
                      <td>{adproduct.countInstock}</td>
                      <td>{adproduct.description}</td>
                      <td>${adproduct.price}</td>
                      <td>
                        <Button
                          type="button"
                          variant="light"
                          className='btn green'
                          title='Edit'
                        >
                          <Link to= {`/admin/updateproducts/${adproduct._id}`}>
                            <i class="fa-solid fa-pencil"></i>
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          variant="light"
                          className='btn red'
                          title='Delete'
                          onClick={()=>deleteProduct(adproduct._id)}
                        >
                          <Link >
                            <i class="fa-solid fa-trash-can"></i>
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
            <Pagination postsPerpage={postsPerPage} totalPosts={adminpro.length} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
      
      

  )
}

export default AdminProducts

function convertToBase64(file){
  return new Promise((resolve,reject)=>{
    const fileReader = new FileReader();
    //convert the file(image) into base64 format so we can store it as string
    fileReader.readAsDataURL(file);
    fileReader.onload =()=>{
      resolve(fileReader.result);
    };
    fileReader.onerror=(error)=>{
      reject(error);
    }
  })

}