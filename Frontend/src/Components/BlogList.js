import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('http://localhost:5000/api/blogs');
            const data = await response.json();
            setBlogs(data);
        };

        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            await fetch(`http://localhost:5000/api/blogs/delete${id}`, { method: 'DELETE' });
            setBlogs(blogs.filter(blog => blog._id !== id));
        }
        const handledelete = () => {
            history('/delete/:id');
        };
        const handleupdate = () => {
            history('/update/:id');
        };
    

    return (
        <div className="container">
            <h2>Blog Posts</h2>
            <Link to="/blogs/new" className="btn btn-success">Create New Blog</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog._id}>
                            <td>{blog.title}</td>
                            <td>{blog.category}</td>
                            <td>{blog.status}</td>
                            <td>
                                <Link to={`/blogs/edit/${blog._id}`} className="btn btn-primary">Edit</Link>
                                <button className="btn btn-danger" onClick={(handledelete) => deleteBlog(blog._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
};
export default BlogList;

