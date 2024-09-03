import React, { useState, useEffect, startTransition } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertToast from "./AlertComponents";

export default function UpdateSiswaComponents() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [nama, setName] = useState('');
    const [kelas, setKelas] = useState('');
    const [nilai, setNilai] = useState('');
    const [dataSiswa, setDataSiswa] = useState([]);
    
    useEffect(() => {
        return () => {
            axios.get(`http://localhost:5000/siswa/${id}`)
            .then(response => {
                if (response.data.msg == 'not found') {
                    AlertToast('error', 'Siswa tidak ditemukan!');
                    navigate('/home');
                }
                setDataSiswa(response.data[0]['nama_siswa']);
            })
            .catch(error => {
                // console.error('something error!', error);
            });
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updateSiswa = {
            nama: nama,
            kelas: kelas,
            nilai: nilai,
        };

        axios.put(`http://localhost:5000/siswa/${id}`, updateSiswa)
            .then(response => { 
                AlertToast('success', 'Data siswa berhasil diupdate!');
                navigate('/home');
            })
            .catch(error => {
                console.error('There was an error update siswa!', error);
            });
    };

    const handleBackButton = () => {
        startTransition(() => {
            navigate('/home');
        });
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-defaultBackground font-defaultText">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <button onClick={handleBackButton} className='mb-4 bg-slate-100 rounded py-2 px-3 font-medium text-slate-400'>{'< Back'}</button>
                <h1 className="text-2xl font-bold mb-6">Ubah Data Siswa {dataSiswa}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
                        <input 
                            type="text" 
                            value={nama}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            placeholder="Masukkan nama"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Kelas</label>
                        <input 
                            type="text" 
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            placeholder="Masukkan kelas"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nilai</label>
                        <input 
                            type="text" 
                            value={nilai}
                            onChange={(e) => setNilai(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            placeholder="Masukkan Nilai"
                        />
                    </div>

                    <button type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    >
                        Ubah Data Siswa
                    </button>
                </form>
            </div>
        </div>
    );
}