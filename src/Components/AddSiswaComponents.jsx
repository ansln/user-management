import React, { useState, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertToast from './AlertComponents';

export default function AddSiswaComponents() {
    const navigate = useNavigate();
    const [nama, setName] = useState('');
    const [kelas, setKelas] = useState('');
    const [nilai, setNilai] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSiswa = {
            nama: nama,
            kelas: kelas,
            nilai: nilai,
        };

        axios.post('http://localhost:5000/siswa', newSiswa)
            .then(response => {
                AlertToast('success', 'Data siswa berhasil ditambah!');
                navigate('/home');
            })
            .catch(error => {
                console.error('There was an error!', error);
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
                <h1 className="text-2xl font-bold mb-6">Tambah Siswa</h1>
                
                {successMessage && (
                    <div className="bg-green-200 text-green-800 p-3 mb-4 rounded">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
                        <input 
                            type="text" 
                            value={nama}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            placeholder="Masukkan nama"
                            required
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
                            required
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
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    >
                        Tambah Data Siswa
                    </button>
                </form>
            </div>
        </div>
    );
}