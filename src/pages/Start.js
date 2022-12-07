import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import Input from "../component/Input";
import ButtonPrimary from "../component/ButtonPrimary";
import "./Start.css";
import Gap from "../component/Gap";
import { useState } from "react";
import axios from "axios";

export default function Start() {
  const navigate = useNavigate();
  const [rekamMedis, setRekamMedis] = useState("");
  const [tglLahir, setTglLahir] = useState("");

  const handleChangeRekamMedis = (e) => setRekamMedis(e.target.value);
  const handleChangeTglLahir = (e) => setTglLahir(e.target.value);
  const handleCheckPasien = async () => {
    try {
      const response = await axios.get(
        "https://apireza.destinasicomputindo.com/pasien",
        {
          params: {
            no_rm_pasien: rekamMedis,
            tgl_lahir_pasien: tglLahir,
          },
        }
      );
      if (response.status === 200) {
        navigate("/pendaftaran/" + response.data[0].no_rm_pasien);
      } else {
        console.log("data pasien tidak ditemukan");
      }
    } catch (err) {
      console.log("Terjadi kesalahan pada server");
    }
  };

  return (
    <Layout>
      <div className="contentStart">
        <img
          src="/images/rocket.png"
          className="contentStartImg"
          alt="rocket"
        ></img>
        <Input
          label="Nomor Rekam Medis"
          placeholder="Masukkan nomor rekam medis"
          onChange={handleChangeRekamMedis}
        />
        <Gap height={15} />
        <Input
          label="Tanggal Lahir"
          placeholder="Masukkan tanggal lahir d-m-Y"
          onChange={handleChangeTglLahir}
        />
        <Gap height={30} />
        <ButtonPrimary text="Cek" onClick={handleCheckPasien} />
      </div>
    </Layout>
  );
}
