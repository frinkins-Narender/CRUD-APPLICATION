import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RegisterStudent from './RegisterStudent'

const initialData = {
    name: "",
    email: "",
    phone: "",
    message: ""
}

const StudentData = () => {
    const [student, setStudent] = useState()
    const [toggle, setToggle] = useState(false)
    const [fetchApi, setfetchApi] = useState(false)
    const [editToggle, setEditToggle] = useState(false)
    const [indexing, setIndexing] = useState()

    const [editStudent, setEditStudent] = useState(initialData)

    useEffect(()=> {
        axios.get("http://localhost:4300/students").then((res)=> {
          console.log(res.data);
          setStudent(res.data)
        }).catch((err)=> {
            console.log(err);
        })

    }, [toggle, fetchApi, editToggle]);

    const handleDelete = (data)=> {
        const id  = data.id
        console.log(data);
        axios.delete("http://localhost:4300/students/" + id).then((res)=> {
           console.log(res);
           setfetchApi(!fetchApi)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const handleChange = (e)=> {
        const {id, value} = e.target
        switch(id){
            case "name" :
                setEditStudent((prev)=> ({...prev, name: value}))
                break;

                case "email" :
                    setEditStudent((prev)=> ({...prev, email: value}))
                break;

                case "phone" :
                    setEditStudent((prev)=> ({...prev, phone: value}))
                break;

                case "message" :
                    setEditStudent((prev)=> ({...prev, message: value}))
                break;

                default : {

                }
        }
    }

    const handleUpdateChange = (data)=> {
        const id = data.id
      axios.put("http://localhost:4300/students/" + id, {
        name:editStudent.name? editStudent.name : data.name,
        email:editStudent.email? editStudent.email : data.email,
        phone:editStudent.phone? editStudent.phone : data.phone,
        message:editStudent.message? editStudent.message : data.message
      }).then((res)=> {
         console.log(res);
         setEditToggle(false)
      }).catch((err)=> {
        console.log(err);
      })
    }

  return (
    <>
    
    <div style={{height: "100vh"}}>
      <div className="button">
        <button className='btn btn-primary btn-sm' onClick={()=> setToggle(!toggle)}>{toggle? "Add Student" : "View Student"}</button>
    </div>

    {
        toggle && toggle ? 
        <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Message</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
          student?.map((element, index)=> {
              return(
                  <tr key={element.id}>
                      <td>{index + 1}</td>
                      <td>{editToggle && index === indexing ? <input id="name" onChange={(e)=> handleChange(e)} defaultValue={element.name}/> : element.name}</td>
                      <td>{editToggle && index === indexing ? <input id="email" onChange={(e)=> handleChange(e)} defaultValue={element.email}/> : element.email}</td>
                      <td>{editToggle && index === indexing ? <input id="phone" onChange={(e)=> handleChange(e)} defaultValue={element.phone}/> : element.phone}</td>
                      <td>{editToggle && index === indexing ? <input id="message" onChange={(e)=> handleChange(e)} defaultValue={element.message}/> : element.message}</td>
                      {
                        editToggle && index === indexing ? <td>
                        <button className="btn btn-success mx-2" onClick={()=> handleUpdateChange(element)}>Save</button>
                        <button className="btn btn-danger" onClick={()=> setEditToggle(false)}>Cancel</button>
                      </td>
                        :
                        <td>
                        <button className="btn btn-success mx-2" onClick={()=>{setIndexing(index);setEditToggle(true)}}>Edit</button>
                        <button className="btn btn-danger" onClick={()=> handleDelete(element)}>Delete</button>
                      </td>
                        
                      }

                      
                  </tr>
              )
          })
          }
      
        </tbody>
      </table>
      :
       <RegisterStudent setToggle={setToggle}/>
    }

    </div>

    </>
  )
}

export default StudentData