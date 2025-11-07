import React from 'react';
import { useLoaderData } from 'react-router';
import { ModelCard } from '../components/ModelCard';

const AllModels = () => {
    const allModels = useLoaderData().data
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
           {
            allModels.map(model=><ModelCard key={model._id} model={model} />)
           }
        </div>
    );
};

export default AllModels;