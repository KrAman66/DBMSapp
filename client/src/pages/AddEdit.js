import React, {useState, useEffect,} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    Name:"",
    Email: "",
    Contact: "",
};


const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const history = useNavigate();

    const {Name, Email, Contact} = state;

    const {id} = useParams();

    useEffect(() =>{
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Name || !Email || !Contact) {
            toast.error("Please provide value into each input field");
        }else{
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    Name,
                    Email,
                    Contact
                })
                .then(() => {
                    setState({ Name: "", Email: "", Contact:""});
                }).catch((err) => toast.error(err.response.data));
              toast.success("Contact Added Successfully");   
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    Name,
                    Email,
                    Contact
                })
                .then(() => {
                    setState({ Name: "", Email: "", Contact:""});
                }).catch((err) => toast.error(err.response.data));
              toast.success("Contact Updated Successfully");
            }

          setTimeout(() => {history("/");}, 500);  
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };

    return(
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
          >
                <label htmlFor="Name">Name</label>
                <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Your Name:"
                value={Name || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="Email">Email</label>
                <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Your Email:"
                value={Email || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="Contact">Contact</label>
                <input
                type="number"
                id="Contact"
                name="Contact"
                placeholder="Your Contact No.:"
                value={Contact || ""}
                onChange={handleInputChange}
                />
               <input type="submit" value={id ? "Update" : "Save" }/>
               <Link to="/">
                <input type="button" value="Go Back" />
               </Link>
            </form>
        </div>
    );
};

export default AddEdit;