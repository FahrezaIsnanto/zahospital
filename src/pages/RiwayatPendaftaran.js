import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gap from "../component/Gap";
import Layout from "../component/Layout";
import RiwayatCard from "../component/RiwayatCard";
import "./RiwayatPendaftaran.css";

export default function RiwayatPendaftaran() {
  const { no_rm_pasien } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchRiwayatPendaftaran() {
      try {
        const response = await axios.get(
          "https://apireza.destinasicomputindo.com/pendaftaran",
          {
            params: {
              no_rm_pasien,
            },
          }
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    async function fetchData() {
      setIsLoading(true);
      await fetchRiwayatPendaftaran();
      setIsLoading(false);
    }
    fetchData();
  }, [no_rm_pasien]);

  return (
    <Layout>
      <div className="contentRiwayatPendaftaran">
        <img
          src="/images/rocket.png"
          className="contentRiwayatPendaftaranImg"
          alt="rocket"
        ></img>
        {isLoading ? (
          <p>Harap Tunggu..</p>
        ) : (
          data.map(function (item, index) {
            return (
              <div key={index}>
                <Gap height={15} />
                <RiwayatCard riwayat={item} />
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
