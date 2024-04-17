import React from 'react';
import { useForm } from 'react-hook-form';
import Header from './Header';

// Define common CSS classes
const inputStyles = "form-input w-full px-3 py-2 bg-slate-500 border border-gray-300 placeholder-gray-300 text-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xl";
const labelStyles = "block text-white font-semibold mb-2";
const errorStyles = "text-red-500";

const PropertyEnlistForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Here you can handle submitting the data to your backend
    };

    return (
        <div>
            <div className='fixed w-full'>
                <Header />
            </div>

            <div className="bg-gradient-to-br from-black to-slate-600 min-h-screen flex flex-col md:flex-row">

                <div className="md:w-1/2 flex justify-center items-center bg-contain bg-center">
                    <img className='w-4/5' src="src/assets/pg_enlist_image3.png" alt="" srcSet="" />
                </div>

                <div className="justify-center md:w-1/2 flex items-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl w-full space-y-8 text-black">
                        <div className='flex justify-start'>
                            <h2 className="mt-6 text-amber-400 text-center text-4xl md:text-6xl font-extrabold">Enlist Your PG</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="propertyName" className={labelStyles}>Property Name</label>
                                <input type="text" id="propertyName" {...register('propertyName', { required: true, minLength: 3, maxLength: 50 })} className={inputStyles} />
                                {errors.propertyName && errors.propertyName.type === "required" && <span className={errorStyles}>Property Name is required</span>}
                                {errors.propertyName && errors.propertyName.type === "minLength" && <span className={errorStyles}>Property Name should be at least 3 characters</span>}
                                {errors.propertyName && errors.propertyName.type === "maxLength" && <span className={errorStyles}>Property Name should not exceed 50 characters</span>}
                            </div>
                            <div>
                                <label htmlFor="address" className={labelStyles}>Address</label>
                                <input type="text" id="address" {...register('address', { required: true, minLength: 5, maxLength: 100 })} className={inputStyles} />
                                {errors.address && errors.address.type === "required" && <span className={errorStyles}>Address is required</span>}
                                {errors.address && errors.address.type === "minLength" && <span className={errorStyles}>Address should be at least 5 characters</span>}
                                {errors.address && errors.address.type === "maxLength" && <span className={errorStyles}>Address should not exceed 100 characters</span>}
                            </div>
                            <div>
                                <label htmlFor="city" className={labelStyles}>City</label>
                                <input type="text" id="city" {...register('city', { required: true })} className={inputStyles} />
                                {errors.city && <span className={errorStyles}>City is required</span>}
                            </div>
                            <div>
                                <label htmlFor="state" className={labelStyles}>State</label>
                                <input type="text" id="state" {...register('state', { required: true })} className={inputStyles} />
                                {errors.state && <span className={errorStyles}>State is required</span>}
                            </div>
                            <div>
                                <label htmlFor="pincode" className={labelStyles}>Pincode</label>
                                <input type="text" id="pincode" {...register('pincode', { required: true, pattern: /^[0-9]{5}$/ })} className={inputStyles} />
                                {errors.pincode && errors.pincode.type === "required" && <span className={errorStyles}>Pincode is required</span>}
                                {errors.pincode && errors.pincode.type === "pattern" && <span className={errorStyles}>Invalid Pincode format</span>}
                            </div>
                            <div>
                                <label htmlFor="description" className={labelStyles}>Description</label>
                                <textarea id="description" {...register('description')} className={`${inputStyles} form-textarea`} />
                            </div>
                            <div>
                                <label htmlFor="rent" className={labelStyles}>Rent</label>
                                <input type="number" id="rent" {...register('rent', { required: true, min: 0 })} className={inputStyles} />
                                {errors.rent && errors.rent.type === "required" && <span className={errorStyles}>Rent is required</span>}
                                {errors.rent && errors.rent.type === "min" && <span className={errorStyles}>Rent should be a positive number</span>}
                            </div>
                            <div>
                                <label htmlFor="numRooms" className={labelStyles}>Number of Rooms</label>
                                <input type="number" id="numRooms" {...register('numRooms', { required: true, min: 1 })} className={inputStyles} />
                                {errors.numRooms && errors.numRooms.type === "required" && <span className={errorStyles}>Number of Rooms is required</span>}
                                {errors.numRooms && errors.numRooms.type === "min" && <span className={errorStyles}>Number of Rooms should be at least 1</span>}
                            </div>
                            <div>
                                <label htmlFor="numBathrooms" className={labelStyles}>Number of Bathrooms</label>
                                <input type="number" id="numBathrooms" {...register('numBathrooms', { required: true, min: 1 })} className={inputStyles} />
                                {errors.numBathrooms && errors.numBathrooms.type === "required" && <span className={errorStyles}>Number of Bathrooms is required</span>}
                                {errors.numBathrooms && errors.numBathrooms.type === "min" && <span className={errorStyles}>Number of Bathrooms should be at least 1</span>}
                            </div>
                            <div>
                                <label htmlFor="availableDate" className={labelStyles}>Available Date</label>
                                <input type="date" id="availableDate" {...register('availableDate', { validate: { dateNotPast: (value) => value && new Date(value) > new Date() } })} className={`${inputStyles} rounded-b-md`} />
                                {errors.availableDate && errors.availableDate.type === "dateNotPast" && <span className={errorStyles}>Available Date should be in the future</span>}
                            </div>
                            <div>
                                <label htmlFor="isAvailable" className={labelStyles}>Available</label>
                                <select id="isAvailable" {...register('isAvailable')} className="form-select">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Enlist Property</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyEnlistForm;
