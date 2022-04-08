import React, { useState, useContext } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { UserContext } from "../../contexts/userContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

import SignInForm from "../../components/SignInForm";
import ResetPasswordS1 from "../../components/ResetPasswordS1";
import ResetPasswordS2 from "../../components/ResetPasswordS2";
import ResetPasswordS3 from "../../components/ResetPasswordS3";

import Image from "next/image";
const SignIn = () => {
  const [resetPassword, setResetPassword] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { addUser } = useContext(UserContext);

  const router = useRouter();

  const logIn = async (e) => {
    e.preventDefault();
    setError(null);
    const fields = e.target;
    const info = {
      email: fields.email.value,
      password: fields.password.value,
    };
    setLoading(true);
    const { data } = await axios.post("/api/account", info);
    setLoading(false);
    if (data.status === "SUCCESS") {
      if (data.user.verified.status !== "APPROVED")
        setError("Contul dvs. nu a fost validat încă. Reveniți mai târziu!");
      else if (data.user.verified.status === "APPROVED") {
        addUser(data.user);
        router.push("/feed");
      }
    } else setError("Adresa de email sau parola introdusă este greșită.");
  };

  const sendPassword = async (e) => {
    e.preventDefault();
    setError(null);
    const fields = e.target;
    if (fields.password.value !== fields.confirm.value) {
      setError("Parolele introduse nu se potrivesc. Încercați din nou!");
      return;
    }
    setLoading(true);
    const info = {
      email,
      password: fields.password.value,
    };
    const { data } = await axios.patch("/api/savePassword", info);
    setLoading(false);
    if (data.status === "ERROR")
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
  };

  const verifyToken = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data } = await axios.put("/api/resetPassword", {
      token: e.target.token.value,
    });
    setLoading(false);
    if (data.status === "SUCCESS") {
      setResetPassword(resetPassword + 1);
    } else if (data.status === "FAILED") {
      setError("Ați introdus un cod greșit. Încercați din nou!");
    } else
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data } = await axios.post("/api/resetPassword", {
      email: e.target.email.value,
    });
    setLoading(false);
    if (data.status === "SUCCESS") {
      setEmail(e.target.email.value);
      setResetPassword(resetPassword + 1);
    } else if (data.status === "FAILED") {
      setError("Nu există niciun cont cu această adresă de email.");
    } else
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
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
      <div className="lg:w-1/2 w-full h-full bg-white p-5 animate__animated animate__slideInLeft">
        {!resetPassword && (
          <SignInForm
            error={error}
            loading={loading}
            setResetPassword={() => {
              setError(null);
              setResetPassword(resetPassword + 1);
            }}
            logIn={logIn}
          />
        )}
        {resetPassword === 1 && (
          <ResetPasswordS1
            error={error}
            loading={loading}
            sendEmail={sendEmail}
          />
        )}
        {resetPassword === 2 && (
          <ResetPasswordS2
            verifyToken={verifyToken}
            error={error}
            loading={loading}
            setError={setError}
            email={email}
          />
        )}
        {resetPassword === 3 && (
          <ResetPasswordS3
            error={error}
            loading={loading}
            sendPassword={sendPassword}
            setResetPassword={() => setResetPassword(0)}
          />
        )}
      </div>
    </div>
  );
};

export default SignIn;
