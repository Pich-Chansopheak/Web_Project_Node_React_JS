import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const AdminUsers = () => {
  
    const[users,setUser] = useState([]);

    const[name,setName] =useState('');
    const[email,setEmail] =useState('');
    const[password,setPassword] =useState('');
    const[isAdmin,setIsAmin] =useState('false');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    //Delete User
    const deleteUser = async (id) => {
        let result = await fetch(`/api/users/${id}`,{
         method:"Delete"
        });
        result =await result.json();
        if(result){
         alert("User Have Been Deleted Successfully.");
         getUser();
        }
   };

    //get user
    const getUser =async ()=>{
        let result = await fetch('/api/users');
        result =await result.json();
        setUser(result);
    };
    //create user
      const submitHandler = async()=>{
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        let result =await fetch(`/api/users/signup`,{
          method:'Post',
          body:JSON.stringify({name,email,password,isAdmin}),
          headers:{
            'Content-Type':'Application/json'
          }
        });
        result = await result.json();
        if(result){
          alert("Create New User Successfully.");
          getUser();
        }
        
      }
    useEffect(()=>{
        getUser();
    });
//pagination
  const [currentPage,setCurrentPage] = useState(1);

  const [postsPerPage,setPostsPerPage] = useState(5);
//Get Current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUser = users.slice(indexOfFirstPost,indexOfLastPost);
//Change page
// pageNumber get from number in Pagination
const paginate = pageNumber => setCurrentPage(pageNumber);
//End of pagination

  return (
    <Fragment>
        
        <div className="row mt-5 gx-0">
            <div className="col-12 col-md-2 pr-0 ">
                <Sidebar/>
            </div>
            <div className='container'>
            <div className="col-12 col-md-12 m-0">
            <h1 className="my-4">Users</h1>
            {/*"Add product" Modal*/}
            <Button type ='button' onClick={handleShow} className='btn btn-primary float-right mb-2 '>
                    <i className="fa-solid fa-plus"></i>  Add New User
            </Button>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>User Name: </Form.Label>
                            <Form.Control
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>User Email: </Form.Label>
                            <Form.Control
                            type="text"
                            required
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirm-password">
                            <Form.Label>Confirm Password: </Form.Label>
                            <Form.Control
                            type="password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)} 
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
               
            <table className="table admin">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>IS ADMIN</th>
                    <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUser.map((user,i) => (
                    <tr key={user._id}>
                        <td>{currentPage===1? i+1 :i+1+((currentPage-1)*postsPerPage)}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{String(user.isAdmin)}</td>
                        
                        <td>
                        <Button
                            type="button"
                            variant="light"
                            className='btn red'
                            title='Delete'
                            onClick={()=>deleteUser(user._id)}
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
            <Pagination postsPerpage={postsPerPage} totalPosts={users.length} paginate={paginate} currentPage={currentPage} />
            </div>
          
      </div>
    </Fragment>
   ) 
}

export default AdminUsers