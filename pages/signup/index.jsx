import React, { useState } from "react";

import axios from "axios";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

import SignUpS1 from "../../components/SignUpS1";
import SignUpS2 from "../../components/SignUpS2";
import SignUpS3 from "../../components/SignUpS3";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [id, setId] = useState(null);

  const verifyToken = async (e) => {
    e.preventDefault();
    setError(null);
    const { data } = await axios.put("/api/verifyEmail", {
      token: e.target.token.value,
    });
    if (data.status === "SUCCESS") {
      setStep(step + 1);
    } else if (data.status === "FAILED")
      setError("Ați introdus un cod greșit. Încercați din nou!");
    else setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
  };

  const sendCredentials = async (e) => {
    e.preventDefault();
    setError(null);
    const fields = e.target;
    if (fields.confirm.value !== fields.password.value) {
      setError("Parolele nu se potrivesc! Încercați din nou.");
      return;
    }
    if (fields.password.value.length < 6) {
      setError("Parola trebuie să conțină minim 6 caractere!");
      return;
    }
    const info = {
      email: fields.email.value,
      password: fields.password.value,
    };
    const { data } = await axios.post("/api/verifyEmail", info);
    if (data.status === "SUCCESS") {
      setId(data.id);
      setStep(step + 1);
    } else if (data.status === "DUPLICATED")
      setError(
        "Această adresă de email este deja folosită. Vă rugăm să introduceți alta!"
      );
    else setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
  };

  return (
    <div className="w-screen bg-white h-screen w-content bg-blue flex flex-col lg:flex-row justify-center items-center">
      <div className="bg-white lg:h-full h-1/2 w-full flex lg:w-1/2">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="h-full bg-white lg:bg-blue"
        >
          <SwiperSlide>
            <Image src="/city3.jpg" layout="fill" objectFit="cover" />
            <div className=" w-full h-full relative text-center flex bg-black bg-opacity-30">
              <p className="mt-auto mb-10 w-full text-white">
                IdeeRO este o platformă care își propune să facă auzită vocea
                cetățeanului.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/city1.jpg" layout="fill" objectFit="cover" />
            <div className=" w-full h-full relative text-center flex bg-black bg-opacity-30">
              <p className="mt-auto w-full mb-10 text-white">
                Aici fiecare utilizator are dreptul să-și exprime
                inconveniențele si sugestiile cu privire la comunitatea din care
                face parte.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/city2.jpg" layout="fill" objectFit="cover" />
            <div className=" w-full h-full relative text-center flex bg-black bg-opacity-30">
              <p className="mt-auto w-full mb-10 text-white">
                Idee cu idee, împreună putem clădi lumea perfectă!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {step === 1 && (
        <SignUpS1 error={error} sendCredentials={sendCredentials} />
      )}
      {step === 2 && (
        <SignUpS2
          error={error}
          id={id}
          verifyToken={verifyToken}
          setError={setError}
        />
      )}
      {step === 3 && <SignUpS3 error={error} id={id} />}
    </div>
  );
};

export default SignUp;
