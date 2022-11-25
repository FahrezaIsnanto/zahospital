import "./PasienCard.css"
import { Link } from "react-router-dom";

export default function PasienCard({pasien}){
   return ( <div className="pasienCard">
        <table border="0">
             <tr>
                <td>No RM</td>
                <td>:</td>
                <td>{pasien.no_rm_pasien}</td>
            </tr>
            <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{pasien.nama_pasien}</td>
            </tr>
            <tr>
                <td>Tanggal Lahir</td>
                <td>:</td>
                <td>{pasien.tgl_lahir_pasien}</td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>{pasien.alamat_pasien}</td>
            </tr>
            <tr>
                <td>Jenis Kelamin</td>
                <td>:</td>
                <td>{pasien.jenis_kelamin_pasien}</td>
            </tr>
        </table>
        <Link className="buttonPasienCard" to={'/riwayat_pendaftaran/'+pasien.no_rm_pasien}>Riwayat Pendaftaran</Link>
    </div>)
}