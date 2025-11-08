import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ModelCard } from '../components/ModelCard';
import useAxiosSecure from '../hook/useAxiosSecure';

const MyDownlod = () => {
const {user}=use(AuthContext);
const [models, setModels] = useState([])
const axiosSecure=useAxiosSecure()
useEffect(() => {
  axiosSecure.get(`/my-downloads?email=${user.email}`)
  .then(data=>{
    setModels(data.data)
  })
}, [user,axiosSecure])

    return (
        <div>
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
           
                   {
                     models.map(model => <ModelCard key={model._id} model={model} />)
                   }
           
                 </div>
        </div>
    );
};

export default MyDownlod;