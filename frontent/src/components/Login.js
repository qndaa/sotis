import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function () {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const submit = (data) => {
        console.log(data);
        // dispatch(login(data.username, data.password))
        //     .then((response) => {
        //         if(response.blocked === "true") {
        //             toast.warning("Customer is blocked!")
        //             dispatch(logout());
        //         } else {
        //             toast.success("Success login!")
        //             history.push('/home');
        //         }
        //     }).catch(() => {
        //         toast.error("Invalid username or password!");
        //     });
    }

    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
                <div className=" o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form className="user " onSubmit={handleSubmit(submit)}>
                                        <div className="form-group">
                                            <input type="text"
                                                   className={`form-control form-control-user ${errors.username ? 'is-invalid' : ''}`}
                                                   id="username"
                                                   placeholder="Enter Username..." {...register('username', {
                                                required: 'Username is required!',
                                                minLength: {value: 4, message: 'Too short username!'}
                                            })} autoComplete={`false`}/>
                                            {errors.username &&
                                            <div className="invalid-feedback ml-3">{errors.username.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <input type="password"
                                                   className={`form-control form-control-user ${errors.password ? 'is-invalid' : ''}`}
                                                   id="password" placeholder="Password" {...register('password', {
                                                required: 'Password is required!',
                                                minLength: {value: 8, message: 'Too short password'}
                                            })} />
                                            {errors.password &&
                                            <div className="invalid-feedback ml-3">{errors.password.message}</div>}
                                        </div>

                                        <button className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <Link className="small" to="/registration">Create an Account!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}