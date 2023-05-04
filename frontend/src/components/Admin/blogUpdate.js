import Sidebar from './Sidebar';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function BlogUpdate() {
  const [image, setImage] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [blogCreator, setBlogCreator] = useState('');
  const [numComments, setNumberComment] = useState(0);
  const [date, setDate] = useState('');
  const params = useParams();

  // const navigate = useNavigate();

  useEffect(() => {
    getBlog();
  }, []);
  //get data from blog by id and set value in form
  const getBlog = async () => {
    let result = await fetch(`/api/blogs/up/${params.id}`);
    result = await result.json();
    setImage(result.image);
    setTitle(result.title);
    setDescription(result.description);
    setBlogCreator(result.blogCreator);
    setNumberComment(result.numComments);
    setDate(result.date);
  };
  //Update the blog
  const updateBlog = async () => {
    let result = await fetch(`/api/blogs/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({
        image,
        title,
        description,
        blogCreator,
        numComments,
        date,
      }),
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    result = await result.json();
    if (result) {
      // alert('Update Blog Successfully.');
      toast.success('Update Blog Successfully.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };
  return (
    <Fragment>
      <div className="row mt-5 gx-0">
        <div className="col-12 col-md-2 pr-0 ">
          <Sidebar />
        </div>
        <div className="container mt-5 p-0 mb-5">
          <div className="col-12 col-md-5 m-auto">
            <h2 className="text-center text-bold text-light bg-primary">
              Update Blog
            </h2>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title: </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="blogCreator">
                <Form.Label>Author: </Form.Label>
                <Form.Control
                  type="text"
                  value={blogCreator}
                  onChange={(e) => setBlogCreator(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="numComments">
                <Form.Label>Comment: </Form.Label>
                <Form.Control
                  type="text"
                  value={numComments}
                  disabled
                  onChange={(e) => setNumberComment(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Date: </Form.Label>
                <Form.Control
                  type="text"
                  value={date}
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
              <div className="d-grid gap-2 text-center">
                
                <Button variant="secondary" className="btn-signin text-light white">
                  <Link to="/admin/blogs" className="white">
                    Cancel
                  </Link>
                </Button> {' '}
                <Button
                  type="submit"
                  className="btn-signin text-light white"
                  // size="lg"
                  onClick={updateBlog}
                >
                  <Link to="/admin/blogs" className="white">
                    Update
                  </Link>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BlogUpdate;

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
