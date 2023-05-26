import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from '../../utilis/axios'
import { addDestinationPost, adminWalletGet } from '../../utilis/constants'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast'
const AddDestination = () => {
    const navigate = useNavigate()
    const [wallet,setWallet] = useState('')
    const handleLogout=()=>{
        Cookies.remove('admin_jwt')
        navigate('/')
    }
    const {register,handleSubmit,reset,formState: { errors }} =useForm();


      const onSubmit= async (data)=>{
        
        const formData = new FormData();
        formData.append('state',data.state)
        formData.append('country',data.country)
        formData.append('country',data.country)
        formData.append('location',data.location)
        formData.append('image',data.image[0])
        formData.append('short_desc',data.short_desc)
        formData.append('description',data.description)
        
        axios.post(addDestinationPost,formData,{
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res)=>{
           toast.success('New Destination added successfully')
           reset();
        })
      }


    useEffect(()=>{
        axios.get(adminWalletGet).then((res)=>{
            console.log(res.data);
            setWallet(res.data)
        })
    },[])
  return (
    <>
     <div id="wrapper">

{/* <!-- Sidebar --> */}
<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    {/* <!-- Sidebar - Brand --> */}
    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3"> <Link to='/admin_home' style={{color:"white",textDecoration:"none"}}>TourWhiz  Admin </Link> </div>
    </a>

    {/* <!-- Divider --> */}
    <hr className="sidebar-divider my-0"/>

    {/* <!-- Nav Item - Dashboard --> */}
    
   

</ul>
{/* <!-- End of Sidebar --> */}

{/* <!-- Content Wrapper --> */}
<div id="content-wrapper" className="d-flex flex-column">

    {/* <!-- Main Content --> */}
    <div id="content">

        {/* <!-- Topbar --> */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

    

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    {/* <!-- Dropdown - Messages --> */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2"/>
                                <div className="input-group-append ">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <div>
                   <h5 className='mr-2 mt-1'>Revenue:{wallet.total_revenue}</h5>
                </div>
                <div>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout </button>
                </div>

              
                

                

               
                

            </ul>

        </nav>
        {/* <!-- End of Topbar --> */}

        {/* <!-- Begin Page Content --> */}
        <div className="container-fluid">

            {/* <!-- Page Heading --> */}
            <h4 className='text-center text-dark text-uppercase font-weight-bold'>Add Destination</h4>
            <div className='container-fluid' style={{maxWidth:"60rem"}}>
            <div className="card">
                <div className="card-body">
                  <form enctype="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className="mb-3 col-md-6">
                        <label for="exampleInputEmail1" className="form-label">State</label>
                        <input type="text" className="form-control" {...register('state',{ required: 'State is required' })}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        {errors.state && <span className='small text-danger'>{errors.state.message}</span>}

                        </div>

                        <div className="mb-3 col-md-6">
                        <label for="exampleInputEmail1" className="form-label">Country</label>
                        <input type="text" className="form-control" {...register('country',{ required: 'Country  is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        {errors.country && <span className='small text-danger'>{errors.country.message}</span>}

                        </div>
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                        <label for="exampleInputEmail1" className="form-label">Location</label>
                        <input type="text" className="form-control"{...register('location',{ required: 'Location is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        {errors.location && <span className='small text-danger'>{errors.location.message}</span>}

                        </div>

                        <div className="mb-3 col-md-6">
                            <label for="exampleInputEmail1" className="form-label">Image</label>
                            <input type="file" className="form-control" {...register('image',{ required: 'Image is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            {errors.image && <span className='small text-danger'>{errors.image.message}</span>}

                        </div>
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Short Description</label>
                      <textarea type="text" className="form-control" rows='2' {...register('short_desc',{ required: 'Short Description is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                      {errors.short_desc && <span className='small text-danger'>{errors.short_desc.message}</span>}

                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">Description</label>
                      <textarea type="text" className="form-control" rows='4' {...register('description',{ required: 'Description is required' })} id="exampleInputPassword1"/>
                      {errors.description && <span className='small text-danger'>{errors.description.message}</span>}

                    </div>
                   
                    <button type="submit" className="btn btn-primary">Save</button>
                    
                  </form>
                </div>
              </div>
            </div>
              


          
        </div>
        {/* <!-- /.container-fluid --> */}

    </div>
    {/* <!-- End of Main Content --> */}

    {/* <!-- Footer --> */}
    <footer className="sticky-footer bg-white">
        <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2020</span>
            </div>
        </div>
    </footer>
    {/* <!-- End of Footer --> */}

</div>
{/* <!-- End of Content Wrapper --> */}

</div>
{/* <!-- End of Page Wrapper --> */}

{/* <!-- Scroll to Top Button--> */}
<a className="scroll-to-top rounded" href="#page-top">
<i className="fas fa-angle-up"></i>
</a>

{/* <!-- Logout Modal--> */}
<div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div className="modal-dialog" role="document">
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a className="btn btn-primary" href="login.html">Logout</a>
        </div>
    </div>
</div>
</div>
    </>
  )
}

export default AddDestination
