import axios from 'axios';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import Sidebar from './Sidebar';
import './css/style.css';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, adminblogs: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AdminBlogs = () => {
  const [{ adminblogs }, dispatch] = useReducer(logger(reducer), {
    adminblogs: [],
    loading: true,
    error: '',
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [delShow, setDelShow] = useState(false);
  const handleDeleteShow = () => setDelShow(true);
  const handleDeleteClose = () => setDelShow(false);

  const [image, setImage] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [blogCreator, setBlogCreator] = useState('');
  const [numComments, setNumberComment] = useState(0);
  const [date, setDate] = useState('');
//pagination
  const [currentPage,setCurrentPage] = useState(1);

  const [postsPerPage,setPostsPerPage] = useState(3);
//Get Current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlog = adminblogs.slice(indexOfFirstPost,indexOfLastPost);
//Change page
// pageNumber get from number in Pagination
const paginate = pageNumber => setCurrentPage(pageNumber);
//End of pagination
  //Set Image
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };
  //Delete blog
  const deleteBlog = async (id) => {
    let result = await fetch(`/api/blogs/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      toast.success('Blog Have Been Deleted Successfully.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      fetchData();
    }
  };
  //delete blog then close modal
  const delmodal = async (id) => {
    //call delete function
    deleteBlog(id);
    handleDeleteClose();
  };
  //Add blog
  const submitHandler = async () => {
    let result = await fetch('/api/blogs', {
      method: 'Post',
      body: JSON.stringify({
        image,
        title,
        description,
        numComments,
        blogCreator,
        date,
      }),
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    result = await result.json();
    if (result) {
      toast.success('Create New Blog Successfully.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      fetchData();
    }
  };
    //add blog then close modal
    const addmodal = async () => {
      //call add blog function
      submitHandler();
      handleClose();
    };
  //get blog
  const fetchData = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const result = await axios.get('/api/blogs');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: err.message });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="row mt-5 gx-0">
        <div className="col-12 col-md-2 pr-0 ">
          <Sidebar />
        </div>
        <div className="container">
          <div className="col-12 col-md-12 m-0">
            <h1 className="my-4">Blogs</h1>

            <Button
              type="button"
              onClick={handleShow}
              className="btn btn-primary float-right mb-2 size_15"
            >
              <i className="fa-solid fa-plus"></i> Add New Blog
            </Button>

            {/* Add modal */}
            <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Title: </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Description: </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="creator">
                      <Form.Label>Author: </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setBlogCreator(e.target.value)}
                      />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="numComments">
                      <Form.Label>Comment: </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => setNumberComment(e.target.value)}
                      />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="date">
                      <Form.Label>Date: </Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                      <Form.Label>Image: </Form.Label>
                      <Form.Control
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={handleImgUpload}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    onClick={addmodal}
                  >
                    Create
                  </Button>
                </Modal.Footer>
              </Modal>
            </>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>IMAGE</th>
                  <th>COMMENTS</th>
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>AUTHOR</th>
                  <th>DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {/* orders.map((order) to render from backend to the screen */}
                {currentBlog.map((blog, i) => (
                  <tr key={blog._id}>
                    <td>{currentPage===1? i+1 :i+1+((currentPage-1)*postsPerPage)}</td>
                    <td>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        width={70}
                        heigth={70}
                      ></img>
                    </td>
                    <td>{blog.numComments}</td>
                    <td>{blog.title.slice(0, 15) + '...'}</td>
                    <td>{blog.description.slice(0, 25) + '...'}</td>
                    <td> {blog.blogCreator}</td>
                    <td> {blog.date.slice(0, 10)} </td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        className="btn green"
                        title="Edit"
                      >
                        <Link to={`/admin/updateblogs/${blog._id}`}>
                          <i class="fa-solid fa-pencil"></i>
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="light"
                        className="btn btn-danger"
                        title="Delete"
                        // onClick={() => deleteBlog(blog._id)}
                        onClick={handleDeleteShow}
                      >
                        <Link>
                          <i class="fa-solid fa-trash-can"></i>
                        </Link>
                      </Button>
                      {/* delete modal */}
                      <>
                        <Modal show={delShow} onHide={handleDeleteClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Blog</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Do you want to delete this blog?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleDeleteClose}
                            >
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => delmodal(blog._id)}
                            >
                              Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination postsPerpage={postsPerPage} totalPosts={adminblogs.length} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
    </Fragment>
  );
};

export default AdminBlogs;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    //convert the file(image) into base64 format so we can store it as string
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
