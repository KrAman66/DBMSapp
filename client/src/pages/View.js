import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import "./View.css";



const View = () => {
    const [user, setUser] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/get/${id}`)
            .then((res) =>  setUser({ ...res.data[0] }));
        
    }, [id]);

    return (
        <div style={{marginTop : "150px"}}>
            <div className='card'>
                <div className='card-header'>
                    <p>User contact details</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                </div>
                <div className="container">
                    <strong>Name:</strong>
                    <span>{user.Name}</span>
                    <br />
                    <br />
                </div>
                <div className="container">
                    <strong>Email:</strong>
                    <span>{user.Email}</span>
                    <br />
                    <br />
                </div>
                <div className="container">
                    <strong>contact:</strong>
                    <span>{user.Contact}</span>
                    <br />
                    <br />
                </div>

                <Link to="/">
                    <button className="btn btn-edit">Go Back</button>
                </Link>

            </div>
        </div>
    );
}

export default View;