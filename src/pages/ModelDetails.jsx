import { Link, useNavigate, useParams } from "react-router";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const ModelDetails = () => {
    const [model, setModel] = useState([])
    const {id}=useParams()
    const [reset, setReset] = useState(false)
    const axiosInstance = useAxios()
    
    const { user } = use(AuthContext)
    useEffect(() => {
        axiosInstance.get(`http://localhost:3000/model-details/${id}`)
            .then(data => {
                setModel(data.data)
            })
    }, [axiosInstance,reset,id])

    const newModel = {
        category: model.category,
        created_at: new Date().toLocaleDateString(),
        created_by: user.email,
        description: model.description,
        downloads: 0,
        name: model.name,
        thumbnail: model.thumbnail
    }

    const navigate = useNavigate()
    const handleDlete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/models/${model._id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Delete!",
                                text: "Your Model has been Deleted.",
                                icon: "success"
                            });
                            navigate(`/all-models`)
                        }
                    })
            }
        });



    }
    const handleDownload = () => {
        axiosInstance.post(`/downlod/${model._id}`, newModel)
            .then(data => {
                console.log(data)
                if (data.data.result.insertedId) {
                    Swal.fire({
                        title: "Downlod!",
                        text: "Your Model has been Downloded.",
                        icon: "success"
                    });
                    
                }
                if (data.data.dwonlodCount.modifiedCount) {
                    console.log("count")
                   setReset(!reset)
                    
                } 
            })
    }
    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
                    <div className="shrink-0 w-full md:w-1/2">
                        <img
                            src={model.thumbnail}
                            alt=""
                            className="w-full object-cover rounded-xl shadow-md"
                        />
                    </div>

                    <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {model.name}
                        </h1>

                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                                {model.category}
                            </div>

                            <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                                Downloaded: {model.downloads}
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                            {model.description}
                        </p>

                        <div className="flex flex-col md:flex-row gap-3 mt-6">
                            <Link
                                to={`/update-model/${model._id}`}
                                className="btn btn-primary rounded-full bg-linear-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700"
                            >
                                Update Model
                            </Link>
                            <button
                                onClick={handleDownload}
                                className="btn btn-secondary rounded-full"
                            >
                                Download
                            </button>
                            <button
                                onClick={handleDlete}
                                className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelDetails;