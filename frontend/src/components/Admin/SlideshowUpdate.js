import React, { Fragment, useEffect, useReducer, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';


const SlideshowUpdate = () => {
    
    
    
    const[image,setImage] =useState({});
    const[title,setTitle] =useState('');
    const[subtitle,setSubtitle]=useState('');
    const[enable,setEnable]=useState('');
    const params = useParams();
    //Set Image
    const handleImgUpload = async (e) => {
        const file = e.target.files[0];
        const base64= await convertToBase64(file);
        setImage(base64);
    };

    const getProduct = async()=>{
        let result = await fetch(`/api/slideshows/${params.id}`);
        result =await result.json();
        setTitle(result.title);
        setImage(result.image);
        setEnable(result.enable);
        setSubtitle(result.subtitle);
       }
    useEffect(()=>{
        getProduct();
      },[]);

    const submitHandler = async()=>{
        
        let result = await fetch(`/api/slideshows/${params.id}`,{
            method:'Put',
            body:JSON.stringify({image,title,subtitle,enable}),
            headers:{
                'Content-Type':'Application/json'
            }
        });
        result = await result.json();
        if(result){
            alert("successful");
            
        }
    };
  
    return (
        <Fragment>
        <div className="row mt-5 gx-0">
          <div className="col-12 col-md-2 pr-0 ">
              <Sidebar/>
          </div>
          <div className='container mt-5 p-0 mb-5'>
            <div className="col-12 col-md-5 m-auto">
                <h2 className='text-center text-bold text-light bg-primary'>Update Slideshow</h2>
                <Form >
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subtitle">
                            <Form.Label>Subtitle: </Form.Label>
                            <Form.Control
                            type="text"
                            required
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="enble">
                            <Form.Label>Enable: </Form.Label>
                            <Form.Control
                            type="text"
                            required
                            value={enable}
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
                            <img width={200} height={200} src={image}></img>
                        </Form.Group> 
                       
                            <div className="d-grid gap-2 text-center ">
                                <Button variant="secondary" className="btn-signin text-light white">
                                    <Link to="/admin/slideshows" className="white">
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" className="btn-signin text-light white" size='lg' onClick={submitHandler}>
                                    <Link to='/admin/slideshows' className='white'>
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

export default SlideshowUpdate

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