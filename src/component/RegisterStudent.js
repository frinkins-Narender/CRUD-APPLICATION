import axios from 'axios'
import React, { useState } from 'react'

const RegisterStudent = ({setToggle}) => {
    const initialData = {
        name: "",
        email: "",
        phone: "",
        message: ""
    }


const [studentData, setstudentData] = useState(initialData)

    const handleChange = (e)=> {
        const {name, value} = e.target
        switch(name){
            case "name" :
                setstudentData((prev)=> ({...prev, name: value}))
                break;

                case "email" :
                    setstudentData((prev)=> ({...prev, email: value}))
                break;

                case "phone" :
                    setstudentData((prev)=> ({...prev, phone: value}))
                break;

                case "message" :
                    setstudentData((prev)=> ({...prev, message: value}))
                break;

                default : {

                }
        }
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
    axios.post("http://localhost:4300/students", studentData).then((res)=> {
        console.log(res);
        setToggle(true)
     }).catch((err)=> {
        console.log(err);
     })
        
    }

  return (
    <>
    <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" name="name" className="form-control" onChange={(e)=> handleChange(e)}/>
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" name="email" className="form-control" onChange={(e)=> handleChange(e)}/>
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="phone" id="form3Example4c" name="phone" className="form-control" onChange={(e)=> handleChange(e)}/>
                      <label className="form-label" htmlFor="form3Example4c">Phone</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example4cd" name="message" className="form-control" onChange={(e)=> handleChange(e)}/>
                      <label className="form-label" htmlFor="form3Example4cd">Message</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default RegisterStudent