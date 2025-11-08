import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { ModelCard } from '../components/ModelCard';
import { IoIosSearch } from 'react-icons/io';
import useAxios from '../hook/useAxios';

const AllModels = () => {
    const allModels = useLoaderData().data;
    const [models, setModels] = useState(allModels)
    const axiosInstance=useAxios()
    const handleSearch=(e)=>{
        e.preventDefault();
        const search = e.target.search.value;
        axiosInstance.get(`/models?search=${search}`)
        .then(data=>{
            setModels(data.data)
        })
    }
    return (
        <div>
            <div className='search mt-5'>
                <form onSubmit={handleSearch} className="join">
                    <div>
                        <label className="input validator join-item">
                            
                            <input type="text" name='search' placeholder="Search " />
                        </label>
                        <div className="validator-hint hidden">Enter valid email address</div>
                    </div>
                    <button className="btn btn-neutral join-item"><IoIosSearch /></button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
                {
                    models.map(model => <ModelCard key={model._id} model={model} />)
                }
            </div>
        </div>
    );
};

export default AllModels;