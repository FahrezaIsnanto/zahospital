import LinkPrimary from "../component/LinkPrimary";
import LinkSecondary from "../component/LinkSecondary";
import Layout from "../component/Layout";
import Gap from "../component/Gap";

import "./Welcome.css";

export default function Welcome(){
    return (
        <Layout>
            <div className="contentWelcome">
                <img src="/images/rocket.png" className="contentWelcomeImg" alt="rocket"></img>
                <h2 className="contentWelcomeTitle">Daftar Secepat Roket</h2>
                <p className="contentWelcomeBody">mulai sekarang daftar cepat tanpa antri hanya dengan pilih poli tujuan, tanggal periksa dan dokter yang diinginkan .</p>
                <Gap
                    height={25}
                />
               <LinkPrimary
                    url="start"
                    text="Mulai"
                />
                <Gap
                    height={10}
                />
                <LinkSecondary
                    url="/jadwal_dokter"
                    text="Jadwal Dokter"
                />
            </div>
        </Layout>
    )
}