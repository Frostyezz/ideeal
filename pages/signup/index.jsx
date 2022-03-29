import React, { useState, useEffect } from "react";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

import Image from "next/image";

import SignUpS1 from "../../components/SignUpS1";
import SignUpS2 from "../../components/SignUpS2";
import SignUpS3 from "../../components/SignUpS3";
import SignUpS4 from "../../components/SignUpS4";
import SignUpS5 from "../../components/SignUpS5";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [files, setFiles] = useState({
    ic: null,
    profileImg: null,
  });
  const [location, setLocation] = useState({
    county: null,
    city: null,
  });
  useEffect(() => {
    const current = localStorage.getItem("step");
    if (current) setStep(parseInt(current));
    const _id = localStorage.getItem("id");
    if (_id) setId(_id);
  }, []);

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  const saveLocation = async (e) => {
    e.preventDefault();
    setError(null);
    if (!location.county || !location.city) {
      setError("Vă rugăm să selectați județul și localitatea.");
      return;
    }
    if (!files.ic) {
      setError("Vă rugăm să încărcați o poză cu buletinul dvs.");
      return;
    }
    const info = {
      ...location,
      ic: files.ic,
    };
    setLoading(true);
    const { data } = await axios.put(`/api/account/${id}`, info);
    setLoading(false);
    if (data.status === "SUCCESS") {
      localStorage.removeItem("step");
      localStorage.removeItem("id");
      setStep(step + 1);
    } else
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
  };

  const saveUser = async (e) => {
    e.preventDefault();
    setError(null);
    const fields = e.target;
    if (
      containsSpecialChars(fields.first.value) ||
      containsSpecialChars(fields.last.value)
    ) {
      setError("Numele sau prenumele nu poate conține caractere speciale!");
      return;
    }
    setLoading(true);
    const info = {
      firstName: fields.first.value.trim(),
      lastName: fields.last.value.trim(),
      img: files.profileImg,
    };
    const { data } = await axios.post(`/api/account/${id}`, info);
    setLoading(false);
    if (data.status === "SUCCESS") {
      sessionStorage.setItem("name", info.firstName);
      localStorage.setItem("step", "4");
      setStep(step + 1);
    } else
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
  };

  const verifyToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data } = await axios.put("/api/verifyEmail", {
      token: e.target.token.value,
    });
    setLoading(false);
    if (data.status === "SUCCESS") {
      setStep(step + 1);
      localStorage.setItem("step", "3");
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
    setLoading(true);
    const { data } = await axios.post("/api/verifyEmail", info);
    setLoading(false);
    if (data.status === "SUCCESS") {
      setId(data.id);
      setStep(step + 1);
      localStorage.setItem("step", "2");
      localStorage.setItem("id", data.id);
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
            <Image priority src="/city3.jpg" layout="fill" objectFit="cover" />
            <div className=" w-full h-full relative text-center flex bg-black bg-opacity-30">
              <p className="mt-auto mb-10 w-full text-white">
                IdeeRO este o platformă care își propune să facă auzită vocea
                cetățeanului.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image priority src="/city1.jpg" layout="fill" objectFit="cover" />
            <div className=" w-full h-full relative text-center flex bg-black bg-opacity-30">
              <p className="mt-auto w-full mb-10 text-white">
                Aici fiecare utilizator are dreptul să-și exprime
                inconveniențele si sugestiile cu privire la comunitatea din care
                face parte.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image priority src="/city2.jpg" layout="fill" objectFit="cover" />
            <div className=" w-full h-full relative text-center flex bg-black bg-opacity-30">
              <p className="mt-auto w-full mb-10 text-white">
                Idee cu idee, împreună putem clădi lumea perfectă!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {step === 1 && (
        <SignUpS1
          error={error}
          sendCredentials={sendCredentials}
          loading={loading}
        />
      )}
      {step === 2 && (
        <SignUpS2
          loading={loading}
          error={error}
          id={id}
          verifyToken={verifyToken}
          setError={setError}
        />
      )}
      {step === 3 && (
        <SignUpS3
          loading={loading}
          error={error}
          files={files}
          setFiles={setFiles}
          saveUser={saveUser}
        />
      )}
      {step === 4 && (
        <SignUpS5
          loading={loading}
          error={error}
          files={files}
          setFiles={setFiles}
          location={location}
          setLocation={setLocation}
          saveLocation={(e) => saveLocation(e)}
        />
      )}
      {step === 5 && <SignUpS4 />}
    </div>
  );
};

export default SignUp;
