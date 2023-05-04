import Sidebar from './Sidebar'
import React, { Fragment, useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function ProductUpdate () {
  
  const[name,setName] = useState('');
  const[slug,setSlug] = useState('');
  const[image,setImage] = useState('');
  const[brand,setBrand] = useState('');
  const[category,setCategory] = useState('');
  const[countInstock,setCountInstock] = useState('');
  const[description,setDescription] = useState();
  const[price,setPrice] = useState();
  const params = useParams();

  const navigate= useNavigate();

  useEffect(()=>{
    getProduct();
  },[]);
  //get data from product by id and set value in form
  const getProduct = async()=>{
   let result = await fetch(`/api/products/up/${params.id}`);
   result =await result.json();
   setName(result.name);
   setSlug(result.slug);
   setImage(result.image);
   setBrand(result.brand);
   setCategory(result.category);
   setCountInstock(result.countInstock);
   setDescription(result.description);
   setPrice(result.price);
  }
 //Update the producct
  const updateProduct = async()=>{
    let result =await fetch(`/api/products/${params.id}`,{
      method:'Put',
      body:JSON.stringify({name,slug,image,brand,category,countInstock,description,price}),
      headers:{
        'Content-Type':'Application/json'
      }
    });
    result = await result.json();
    if(result){
      alert("Update Product Successfully.");
    }
    
  }
  

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const base64= await convertToBase64(file);
    setImage(base64);
  };
    return (
    <Fragment>
    <div className="row mt-5 gx-0">
      <div className="col-12 col-md-2 pr-0 ">
          <Sidebar/>
      </div>
      <div className='container mt-5 p-0 mb-5'>
      <div className="col-12 col-md-5 m-auto">
      <h2 className='text-center text-bold text-light bg-primary'>Update Product</h2>
                  <Form >
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Product Name: </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="slug">
                        <Form.Label>Slug: </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={slug}
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
                        <img width={200} height={200} src={image}></img>
                      </Form.Group> 
                      <Form.Group className="mb-3" controlId="brand">
                        <Form.Label>Brand: </Form.Label>
                        <Form.Control
                          type="text"
                          value={brand}
                           onChange={(e) => setBrand(e.target.value)} 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category: </Form.Label>
                        <Form.Control
                          type="text"
                          value={category}
                          onChange={(e) =>setCategory(e.target.value)} 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="countInstock">
                        <Form.Label>Quantity: </Form.Label>
                        <Form.Control
                          type="text"
                          value={countInstock}
                           onChange={(e) => setCountInstock(e.target.value)} 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description: </Form.Label>
                        <Form.Control
                          type="text"
                          value={description}
                           onChange={(e) => setDescription(e.target.value)} 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price: </Form.Label>
                        <Form.Control
                          type="text"
                          value={price}
                           onChange={(e) => setPrice(e.target.value)} 
                        />
                      </Form.Group>
                      <div className="d-grid gap-2 text-center ">
                        <Button type="submit" className="btn-signin text-light white" size='lg' onClick={updateProduct}>
                          <Link to='/admin/products' className='white'>
                              Update
                          </Link>
                        
                        </Button>
                    </div>
                    </Form>
            </div>
            </div>
            </div>                
          
          </Fragment>
  )
}

export default ProductUpdate

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