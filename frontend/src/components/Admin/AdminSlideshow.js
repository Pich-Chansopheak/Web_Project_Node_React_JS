import axios from 'axios';
import React, { Fragment, useEffect, useReducer, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import {Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import Sidebar from './Sidebar';
import Pagination from './Pagination';





const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, slideshows: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

const AdminSlideshow = () => {

    const [{ loading, error, slideshows }, dispatch] = useReducer(
        logger(reducer),
        {
          slideshows: [],
          loading: true,
          error: '',
        }
      );

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[image,setImage] =useState({});
    const[title,setTitle] =useState('');
    const[subtitle,setSubtitle]=useState('');
    const[enable,setEnable]=useState('');
    
    const enDisable = async(id)=>{
        if(slideshows.enable===true){
          setEnable(false);
        }
        else{
          setEnable(true);
        }
        let result = await fetch(`/api/slideshows/enable/${id}`,{
            method:'Put',
            body:JSON.stringify({enable}),
            headers:{
                'Content-Type':'Application/json'
            }
        });
        result = await result.json();
        if(result){
            alert("successful");
            fetchData();
        }
    };
    //Set Image
    const handleImgUpload = async (e) => {
        const file = e.target.files[0];
        const base64= await convertToBase64(file);
        setImage(base64);
      };
    //Delete Slideshow
    const deleteSlideshow = async (id) => {
        let result = await fetch(`/api/slideshows/${id}`,{
         method:"Delete"
        });
        result =await result.json();
        if(result){
         alert("Product Have Been Deleted Successfully.");
         fetchData();
        }
   };
   //Add slideshow
   const submitHandler = async()=>{
    
    let result =await fetch('/api/slideshows',{
      method:'Post',
      body:JSON.stringify({image,title,subtitle,enable}),
      headers:{
        'Content-Type':'Application/json'
      }
    });
    result = await result.json();
    if(result){
      alert("Create New Slideshow Successfully.");
      fetchData();
    }
    
  }
  //pagination
    const [currentPage,setCurrentPage] = useState(1);

    const [postsPerPage,setPostsPerPage] = useState(3);
  //Get Current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentslide = slideshows.slice(indexOfFirstPost,indexOfLastPost);
  //Change page
  // pageNumber get from number in Pagination
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //End of pagination
   //get slideshow
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const result = await axios.get('/api/slideshows/all');
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
                <Sidebar/>
            </div>
            <div className='container'>
                <div className="col-12 col-md-12 m-0">
                    <h1 className="my-4">Slideshows</h1>

                    <Button type ='button' onClick={handleShow} className='btn btn-primary float-right mb-2 '>
                          <i className="fa-solid fa-plus"></i>  Add New Slideshow
                    </Button>
          <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
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
                      <Form.Group className="mb-3" controlId="subtitle">
                        <Form.Label>Subtitle: </Form.Label>
                        <Form.Control
                          type="text"
                           onChange={(e) => setSubtitle(e.target.value)} 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="enable">
                        <Form.Label>Enable: </Form.Label>
                        <Form.Control
                          type="text"
                           onChange={(e) => setEnable(e.target.value)} 
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

                    <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>IMAGE</th>
                            <th>TITLE</th>
                            <th>SUBTITLE</th>
                            <th>ENABLE</th>
                            <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* orders.map((order) to render from backend to the screen */}
                            {currentslide.map((slideshow,i) => (
                            <tr key={slideshow._id}>
                                <td>{currentPage===1? i+1 :i+1+((currentPage-1)*postsPerPage)}</td>
                                <td>
                                    <img src={slideshow.image} alt={slideshow.title} width={70} heigth={70}></img>
                                </td>
                                <td>{slideshow.title}</td>
                                <td>{slideshow.subtitle.slice(0,15)+"..."}</td>
                                <td><i className={"fa-regular "+(slideshow.enable ===true?'fa-eye':'fa-eye-slash')}></i></td>
                                <td>
                                
                                <Button
                                  type="button"
                                  variant="light"
                                  className='btn green'
                                  title='Edit'
                                >
                                  <Link to= {`/admin/slideshowsupdate/${slideshow._id}`}>
                                    <i class="fa-solid fa-pencil"></i>
                                  </Link>
                                </Button>
                                <Button
                                    type="button"
                                    variant="light"
                                    className='btn btn-danger'
                                    title='Delete'
                                    onClick={()=>deleteSlideshow(slideshow._id)}
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
                </div>
                  <Pagination postsPerpage={postsPerPage} totalPosts={slideshows.length} paginate={paginate} currentPage={currentPage} />
            </div>
    
         </div>
    </Fragment>
  )
}

export default AdminSlideshow

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