import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertToast from './AlertComponents';

export default function DataSiswaComponents() {
    const navigate = useNavigate();

    const urlEndpoint = 'http://localhost:5000/siswa';
    const userVerify = 'http://localhost:5000/verify';
    const userLogout = 'http://localhost:5000/logout';
    const [data, setData] = useState([]);

    useEffect(() => {

        axios.get(userVerify, {withCredentials: true})
        .then(res => {
            if(!res.data.user_auth_isLoggedIn){
                navigate('/');
                AlertToast('error', 'You have to log in first');
            }
        })
        .catch(err => console.log(err));
        
        const fetchDataSiswa = async () => {
            try {

                const res = await axios({
                    method: "GET",
                    url: urlEndpoint
                })
                .then(res => setData(res.data))
                .catch(err => console.log(err));

            } catch (error) {
                console.error('Error verifying user login:', error);
            }
        };
        
        fetchDataSiswa();

    }, []);

    const handleAddSiswa = () => {
        window.location.replace('/add');
    };
    
    const handleUpdate = (userId) => {
        window.location.replace('/update/' + userId);
    };

    const afterDeleteAlert = async () => {
        AlertToast('success', 'Data siswa berhasil dihapus!');
        await new Promise(resolve => setTimeout(resolve, 3000));
    };

    const afterDeleteReload = async () => {
        await afterDeleteAlert();
        navigate(0);
    };

    const handleDelete = (userId) => {
        axios.delete('http://localhost:5000/siswa/' + userId)
        .then(response => {
            afterDeleteReload();
        })
        .catch(error => {
            console.error('There was an error deleting the data!', error);
        });
    };

    const handleLogout = async () => {
        await axios.get(userLogout, {withCredentials: true})
        .then(res => {
            const { redirectUrl } = res.data;
            if (redirectUrl) {
                navigate(redirectUrl);
                AlertToast('success', 'Logout Success');
            }
        })
        .catch(err => console.log(err));
    }

return (
    <>
        <div className='w-full h-screen flex flex-col gap-3 p-3 outline-none font-defaultText'>
            <div className="flex flex-col gap-4">
                <header className="bg-white border-b border-gray-200 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
                    <nav className="relative max-w-[85rem] min-w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
                        <div className="min-w-fit flex items-center justify-between">
                            <a className="w-full font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="" aria-label="Brand">Management Siswa</a>

                            <div className="md:hidden">
                                <button type="button" className="hs-collapse-toggle relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" id="hs-header-classic-collapse" aria-expanded="false" aria-controls="hs-header-classic" aria-label="Toggle navigation" data-hs-collapse="#hs-header-classic">
                                <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                                <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                <span className="sr-only">Toggle navigation</span>
                                </button>
                            </div>
                        </div>

                        <div id="hs-header-classic" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-header-classic-collapse">
                        <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1">
                            <a className="p-2 flex items-center text-sm text-blue-500 focus:outline-none focus:text-blue-500" href="" aria-current="page">
                                <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                                Home
                            </a>

                            <div className="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false] ">
                                <button id="hs-header-classic-dropdown" type="button" className="hs-dropdown-toggle w-full p-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                                    <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 2.5-2.5L3 5"/><path d="m3 19 2.5-2.5L3 14"/><path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/></svg>
                                    About
                                    <svg className="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:rotate-0 duration-300 shrink-0 size-4 ms-auto md:ms-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </button>

                                <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full md:w-52 hidden z-10 top-full ps-7 md:ps-0 md:bg-white md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 md:after:hidden after:absolute after:top-1 after:start-[18px] after:w-0.5 after:h-[calc(100%-0.25rem)] after:bg-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="hs-header-classic-dropdown">
                                <div className="py-1 md:px-1 space-y-0.5">
                                    <a className="py-1.5 px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">
                                    About
                                    </a>

                                    <div className="hs-dropdown [--strategy:static] md:[--strategy:absolute] [--adaptive:none] md:[--trigger:hover] [--is-collapse:true] md:[--is-collapse:false] relative">
                                    <button id="hs-header-classic-dropdown-sub" type="button" className="hs-dropdown-toggle w-full py-1.5 px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500">
                                        Sub Menu
                                        <svg className="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:-rotate-90 md:-rotate-90 duration-300 ms-auto shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </button>

                                    <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative md:w-48 hidden z-10 md:mt-2 md:!mx-[10px] md:top-0 md:end-full ps-7 md:ps-0 md:bg-white md:rounded-lg md:shadow-md before:hidden md:before:block before:absolute before:-end-5 before:top-0 before:h-full before:w-5 md:after:hidden after:absolute after:top-1 after:start-[18px] after:w-0.5 after:h-[calc(100%-0.25rem)] after:bg-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="hs-header-classic-dropdown-sub">
                                        <div className="p-1 space-y-0.5 md:space-y-1">
                                        <a className="py-1.5 px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">
                                            About
                                        </a>

                                        <a className="py-1.5 px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">
                                            Downloads
                                        </a>

                                        <a className="py-1.5 px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">
                                            Team Account
                                        </a>
                                        </div>
                                    </div>
                                    </div>

                                    <a className="py-1.5 px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">
                                    Downloads
                                    </a>

                                    <a className="py-1.5 px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">
                                    Team Account
                                    </a>
                                </div>
                                </div>
                            </div>

                            <div className="relative flex items-center gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2">
                                <a className="p-2 w-full flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="/">
                                <svg className="shrink-0 size-4 me-3 md:me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                User
                                </a>
                                <button className="p-2 w-full flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" onClick={() => handleLogout()} >
                                Logout
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </nav>
                </header>

                <div className='w-full'>
                    <button onClick={() => handleAddSiswa()} className='transition ease-in-out w-full bg-blue-500 hover:bg-blue-600 rounded-lg p-4 text-white font-semibold'>Tambah Data Siswa</button>
                </div>

                <div className='mt-4'>
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200der-gray-100 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-4 py-2 text-start text-lg font-medium text-slate-400">No. </th>
                                            <th scope="col" className="px-6 py-3 text-start text-lg font-medium text-slate-400">Nama Siswa</th>
                                            <th scope="col" className="px-6 py-3 text-start text-lg font-medium text-slate-400">Kelas</th>
                                            <th scope="col" className="px-6 py-3 text-start text-lg font-medium text-slate-400">Nilai</th>
                                            <th scope="col" className="px-6 py-3 text-start text-lg font-medium text-slate-400">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((siswa, index) => {
                                            return (
                                                <tr key={siswa.id} className="odd:bg-white even:bg-gray-100">
                                                    <td className="px-6 py-4 font-medium text-gray-400">{index+1}</td>
                                                    <td className="px-6 py-4 font-medium text-gray-800">{siswa.nama_siswa}</td>
                                                    <td className="px-6 py-4 text-gray-800">{siswa.kelas}</td>
                                                    <td className="px-6 py-4 text-gray-800">{siswa.nilai}</td>
                                                    <td className="w-fit flex items-center justify-center text-center gap-4 pt-2">
                                                        <button className='transition ease-in-out w-fit text-sm bg-green-500 text-green-100 hover:bg-green-600 rounded py-2 px-3 font-medium outline-none' onClick={() => handleUpdate(siswa.id)}>Ubah</button>
                                                        <button className='transition ease-in-out w-fit text-sm bg-red-500 text-red-100 hover:bg-red-600 rounded py-2 px-3 font-medium outline-none' onClick={() => handleDelete(siswa.id)}>Hapus</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
);
}