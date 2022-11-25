import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid'
import Layout from "../component/Layout";
import PasienCard from "../component/PasienCard";
import Select from "../component/Select";
import Input from "../component/Input";
import Gap from "../component/Gap";
import ButtonPrimary from "../component/ButtonPrimary";
import "./Pendaftaran.css"
import axios from 'axios';

export default function Pendaftaran(){
    const { no_rm_pasien } = useParams();
    const navigate = useNavigate(); 
    const [dataPasien,setDataPasien] = useState(null);
    const [dataPoli,setDataPoli] = useState(null);
    const [dataJadwalDokter,setDataJadwalDokter] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    // form
    const [poli,setPoli] = useState('');
    const [tglPeriksa,setTglPeriksa] = useState('');
    const [dokter,setDokter] = useState('');


    const handleChangePoli = (e) => setPoli(e.target.value);
    const handleChangeTglPeriksa = async (e) => {
        const tglPeriksaVal = e.target.value;
        setTglPeriksa(tglPeriksaVal)
        const sqlDateFormat = tglPeriksaVal.split("-").reverse().join("-");
        if(sqlDateFormat.length === 10 && poli){
            const dateNum = new Date(sqlDateFormat).getDay();
            await fetchJadwalDokter(poli,dateNum);
        }
    }; 
    const handleChangeDokter = (e) => setDokter(e.target.value); 
    const handleDaftar = async ()=>{
        const id  = nanoid() ;
        const nama_pasien = dataPasien.nama_pasien;
        try{
            const response = await axios.post('https://api-zahospital.herokuapp.com/pendaftaran',{
                id,
                no_rm_pasien,
                nama_pasien,
                poli,
                tglPeriksa,
                dokter
            })
            if(response.status === 201){
                console.log('status pendaftaran',response.data);
                 navigate('/finish/'+id);
            }
        }catch(err){
            console.log('err',err.response.data)
        }
    };

    const fetchJadwalDokter = async(nama_poli,id_hari)=>{
        try{
            const response = await axios.get(
                'https://api-zahospital.herokuapp.com/jadwalDokter',
                {
                    params:{
                        nama_poli,
                        id_hari
                    }      
                }
            )
            if(response.status === 200){
                setDataJadwalDokter(response.data);
            }
        }catch(err){
            console.log('err',err);
        }
    }

    useEffect(()=>{
        async function fetchPasien(){
            try{
                const response = await axios.get(
                 "https://api-zahospital.herokuapp.com/pasien",
                 {
                     params:{
                        no_rm_pasien
                     }
                 });
                 if(response.status === 200){
                    setDataPasien(response.data[0]);
                 }
             }catch(err){
                console.log('err',err);
             }
        }

        async function fetchPoli(){
            try{
                const response = await axios.get(
                 "https://api-zahospital.herokuapp.com/poli",
                 );
                 if(response.status === 200){
                    setDataPoli(response.data);
                 }
             }catch(err){
                console.log('err',err);
             }
        }

        async function fetchData(){
            setIsLoading(true);
            await fetchPasien();
            await fetchPoli();
            setIsLoading(false);
        }   
        fetchData();
    },[no_rm_pasien]);

    return (
         <Layout>
            <div className="contentPendaftaran">
                <img src="/images/rocket.png" className="contentPendaftaranImg" alt="rocket"></img>
                    {
                        isLoading ?
                        (
                            <p>Harap Tunggu..</p>
                        ):
                        (
                            <>
                                <PasienCard
                                pasien={dataPasien}
                            />
                            <Gap height={25}/>
                            <Select
                                label="Poli"
                                option={dataPoli}
                                onChange={handleChangePoli}
                            />
                            <Gap height={15}/>
                            <Input
                                label="Tanggal Periksa"
                                onChange={handleChangeTglPeriksa}
                                />
                            <Gap height={15}/>
                            <Select
                                label="Dokter"
                                option={dataJadwalDokter}
                                onChange={handleChangeDokter}
                            />
                            <Gap height={15}/>
                            <ButtonPrimary
                                text="Daftar"
                                onClick={handleDaftar}
                            />   
                            <Gap height={50}/>
                            </>
                        )
                    }
                    
            </div>
        </Layout>);
}