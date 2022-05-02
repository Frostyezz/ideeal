import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <video
        autoPlay
        muted
        loop
        className="absolute right bottom h-screen w-screen object-cover"
      >
        <source src="/cities.mp4" type="video/mp4" />
      </video>
      <div className="absolute flex flex-col w-screen h-screen justify-center text-center bg-black bg-opacity-50 text-white p-5">
        <h1 className="text-6xl font-bold text-blue">IdeeRO</h1>
        <h2 className="text-lg">
          Locul în care orice <span className="text-blue">idee</span> reprezintă
          un pas spre o lume mai bună!
        </h2>
        <Link href="/signup">
          <a className="bg-orange rounded hover:-translate-y-1 transition duration-500 text-white w-max p-3 mt-3 mx-auto shadow-shadow_1">
            Înregistrează-te
          </a>
        </Link>
        <Link href="/signin">
          <a className="bg-white rounded hover:-translate-y-1 transition duration-500 text-darkBlue w-max p-3 mt-3 mx-auto shadow-shadow_1">
            Loghează-te
          </a>
        </Link>
      </div>
    </div>
  );
}
