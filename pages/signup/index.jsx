import React from "react";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import {
  FormLabel,
  FormErrorMessage,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

const SignUp = () => {
  return (
    <div className="w-screen h-screen bg-blue flex flex-col lg:flex-row justify-center items-center">
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
                Idee cu idee, împreuna putem clădi lumea perfectă.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="lg:w-1/2 w-full h-full bg-white p-5">
        <div className="h-1/3 flex flex-col justify-center border-b-2 border-t-blue items-center text-center">
          <h1 className="text-7xl font-bold border-2 rounded-full px-6 border-darkBlue mb-3">
            1
          </h1>
          <h2>Introduceți credențialele pentru noul cont!</h2>
        </div>
        <div className="h-2/3 flex items-center">
          <FormControl className="2xl:px-48">
            <form>
              <FormLabel className="mt-5" htmlFor="email">
                Adresă de email
              </FormLabel>
              <Input
                className="border-blue"
                isRequired
                type="email"
                id="email"
                name="email"
              />
              <FormLabel className="mt-5" htmlFor="password">
                Parolă
              </FormLabel>
              <Input
                className="border-blue"
                isRequired
                type="password"
                id="password"
                name="password"
              />
              <FormLabel className="mt-5" htmlFor="confirm">
                Confirmare parolă
              </FormLabel>
              <Input
                className="border-blue"
                isRequired
                type="password"
                id="confirm"
                name="confirm"
              />
              <Button className="w-full mt-5 shadow" type="submit">
                Submit
              </Button>
            </form>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
