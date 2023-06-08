import PageComponent from "../components/PageComponent.tsx";
import {useState} from "react";
import {PhotoIcon} from "@heroicons/react/20/solid";
import TButton from "../components/core/TButton.tsx";
import axiosClient from "../axios.js";
import {useNavigate} from "react-router-dom";

export default function SurveyView() {

    const navigate = useNavigate();

    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: "",
        expire_date: "",
        questions: []
    });

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result
            })
            ev.target.value = ""
        }

        reader.readAsDataURL(file);

        console.log('on image choose')
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {...survey};
        if (payload.image) {
            payload.image = payload.image_url
        }
        delete payload.image_url

        axiosClient.post('/survey', payload)
            .then((res) => {
                console.log(res)
                navigate('/surveys')
            })

    }
    // @ts-ignore
    return (
        <PageComponent title="cerate new survey">
            <form action="#" method="POST" onSubmit={onSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        {/*image*/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Photo
                            </label>
                            <div className="mt-1 flex items-center">
                                {survey.image_url && (
                                    <img src={survey.image_url}
                                         alt=""
                                         className="w-32 h-32 object-cover"
                                    />
                                )}

                                {!survey.image_url && (
                                    <span
                                        className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                    <PhotoIcon className="w-8 h-8"/>
                                    </span>
                                )}

                                <button
                                    type="button"
                                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:-outline-offset-2"
                                >
                                    <input type="file" className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                           onChange={onImageChoose}/>
                                    Change
                                </button>
                            </div>
                        </div>

                        {/*    title*/}
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700">
                                Survay Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={survey.title}
                                placeholder="Survay title"
                                className="mt-1 block w-full rounded-md border-gray-300 shado-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                                onChange={(ev) => setSurvey({...survey, title: ev.target.value})}
                            />
                        </div>

                        {/*    description*/}
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={survey.description}
                                placeholder="description"
                                className="mt-1 block w-full rounded-md border-gray-300 shado-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                                onChange={(ev) => setSurvey({...survey, description: ev.target.value})}
                            ></textarea>
                        </div>


                        {/*    title*/}
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="expire_date"
                                className="block text-sm font-medium text-gray-700">
                                Expire date
                            </label>
                            <input
                                type="date"
                                name="expire_date"
                                id="expire_date"
                                value={survey.expire_date}
                                placeholder="Survay title"
                                className="mt-1 block w-full rounded-md border-gray-300 shado-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                                onChange={(ev) => setSurvey({...survey, expire_date: ev.target.value})}
                            />
                        </div>


                        {/*status*/}
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input type="checkbox" name="status" id="status" checked={survey.status}
                                       onChange={(ev) => setSurvey({...survey, status: ev.target.checked})}
                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="comments" className="font-medium text-gray-700">Active</label>
                                <p className="text-gray-500">
                                    Whether to make survey publicly available
                                </p>
                            </div>

                        </div>


                        <div className="bg-gray-50 py-3 px-4 text-right sm:ps6">
                            <TButton>Save</TButton>
                        </div>

                    </div>
                </div>
            </form>
        </PageComponent>
    )
}
