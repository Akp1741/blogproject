import React, { useState } from 'react';

const update='http://localhost:5000/api/blogs/update${id}';
const create ='http://localhost:5000/api/blogs/create';

function BlogForm(){
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[category,setCategory]=useState('');
    const[status,setstatus]=useState('');
}
const onSubmit = async (BlogForm) => {
    try {
        const apiMethod = method === 'POST' ? service.Methods.POST : service.Methods.PUT;
        const url = method === 'POST' ? service.API_URL.create : service.API_URL.update;
        const formData = new FormData();

        Object.entries(BlogForm).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (typeof value === "boolean" || typeof value === "number") {
                    formData.append(key, value.toString());
                }
                else {
                    formData.append(key, value);
                }
            }
        });

        await service.makeAPICall({
            methodName: apiMethod,
            apiUrl: url,
            params: id ?? '',
            body: BlogForm,
        });
        history(-1)
    } catch (error) {
        console.log(error);
    }
   
};
return(
    <div className="container">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type of="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>

);

export default BlogForm;