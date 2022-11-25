import Layout from "../component/Layout";
import "./About.css";


export default function About(){
    return <Layout>
         <div className="contentAbout">
                <img src="/images/rocket.png" className="contentAboutImg" alt="rocket"></img>
                <h2 className="contentAboutTitle">Tentang ZaHospital</h2>
                <p className="contentAboutVersion">version 1.0.0</p>
                <p className="contentAboutBody">Aplikasi ini dikembangkan oleh Muhammad Fahreza Isnanto Mahasiswa Universitas Diponegoro Jurusan Teknik Komputer Angkatan 2020, dengan tujuan memenuhi tugas akhir praktikum pemrograman perangkat bergerak</p>
            </div>
    </Layout>
}