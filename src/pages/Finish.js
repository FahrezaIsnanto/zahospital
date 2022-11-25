import "./Finish.css";
import Layout from "../component/Layout";
import BuktiCard from "../component/BuktiCard";
import LinkPrimary from "../component/LinkPrimary";
import Gap from "../component/Gap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Finish(){
    const { id } = useParams();
    const [data,setData] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        async function fetchPendaftaran(){
            try{
                const response = await axios.get(
                 "https://api-zahospital.herokuapp.com/pendaftaran",
                 {
                     params:{
                        id
                     }
                 });
                 if(response.status === 200){
                    setData(response.data[0]);
                 }
             }catch(err){
                console.log('err',err);
             }
        }
        async function fetchData(){
            setIsLoading(true);
            await fetchPendaftaran();
            setIsLoading(false);
        }   
        fetchData();
    },[id]);
    return (
        <Layout>
             <div className="contentFinish">
                <img src="/images/rocket.png" className="contentFinishImg" alt="rocket"></img>
                {
                        isLoading ?
                        (
                            <p>Harap Tunggu..</p>
                        ):
                        ( <>
                              <BuktiCard
                                data={data}
                              />
                                <Gap height={20}/>
                                <p className="contentFinishBody">Simpan hasil bukti pendaftaran tersebut untuk melakukan check-in pada zahospital sesuai dengan tanggal periksa yang sudah ditentukan</p>
                                <LinkPrimary
                                        url="/"
                                        text="Halaman Utama"
                                    />
                                <Gap height={30}/>
                            </>
                        )
                }
             </div>
        </Layout>
    );
}