import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export default function () {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [parts, setParts] = useState([]);

    const submit = (data) => {
        console.log(data);
    }

    const addPart = () => {
        setParts([...parts, {id: generateUniqueID()}]);
    }

    const resetForm = () => {
      reset();
      setParts([]);
    }

    const renderParts = () => {
        if (parts.length !== 0) {
            return parts.map((part, index) => {
                return (
                    <div key={part.id} className={`ml-4 mr-4 mt-2 ml-2 border border-1 rounded`}>
                        <label className={`h3 m-2`}>Part {index + 1}</label>

                    </div>
                );
            })
        } else {
            return null;
        }

    }

    return (
        <form className={`user`} onSubmit={handleSubmit(submit)}>
            <div className="form-row d-flex justify-content-start">
                <div className="col-1 d-flex justify-content-start ml-4">
                    <label className={`h2`}>Title:</label>
                </div>
                <div className="col d-flex justify-content-start">
                    <input type="text" className="form-control w-25"
                           {...register('title', {
                               required: 'Title is required!'
                           })}
                    />
                </div>
            </div>
            {renderParts()}
            <div className={`form-row`}>
                <button className={`btn btn-outline-success ml-4 mt-2`} onClick={addPart}>Add Part</button>
                <button className={`btn btn-outline-danger ml-4 mt-2`} onClick={resetForm}>Reset</button>
            </div>


        </form>
    );
}