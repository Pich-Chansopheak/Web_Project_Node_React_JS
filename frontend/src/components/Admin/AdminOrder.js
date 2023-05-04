import React, { Fragment, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import Sidebar from './Sidebar'

const AdminOrder = () => {
    const navigate = useNavigate();
    const [orders,setOrder]=useState([]);

    const getOrder = async()=>{
        let result = await fetch('/api/orders');
        result =await result.json();
        setOrder(result);
   }
    //Delete Order
    const deleteOrder= async (id) => {
        let result = await fetch(`/api/orders/${id}`,{
         method:"Delete"
        });
        result =await result.json();
        if(result){
         alert("Order Have Been Deleted Successfully.");
         getOrder();
        }
   };
   useEffect(()=>{
        getOrder();
   },[]);

//pagination
  const [currentPage,setCurrentPage] = useState(1);

  const [postsPerPage,setPostsPerPage] = useState(5);
//Get Current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrder = orders.slice(indexOfFirstPost,indexOfLastPost);
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
                    <h1 className="my-4">Order History</h1>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* orders.map((order) to render from backend to the screen */}
                            {currentOrder.map((order,i) => (
                            <tr key={order._id}>
                                <td>{currentPage===1? i+1 :i+1+((currentPage-1)*postsPerPage)}</td>
                                <td>{order.shippingAddress.fullName}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>
                                {order.isDelivered ? order.deliverAt.substring(0, 10) : 'No'}
                                </td>
                                <td>
                                <Button
                                    type="button"
                                    variant="light"
                                    onClick={() => {
                                    navigate(`/order/${order._id}`);
                                    }}
                                >
                                    Details
                                </Button>
                                <Button
                                    type="button"
                                    variant="light"
                                    className='btn btn-danger'
                                    title='Delete'
                                    onClick={()=>deleteOrder(order._id)}
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
                <Pagination postsPerpage={postsPerPage} totalPosts={orders.length} paginate={paginate} currentPage={currentPage} />
            </div>
      
      </div>
    </Fragment>
  )
}

export default AdminOrder