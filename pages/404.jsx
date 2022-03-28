import React from "react";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center content-center bg-blue">
      <div className="h-1/2 content-bottom flex items-end justify-center">
        <h1 className="text-9xl font-bold text-darkBlue text-center relative top-6">
          404
        </h1>
      </div>
      <div className="w-screen text-blue h-1/2 bg-darkBlue text-white flex flex-col justify-center content-center text-center p-3">
        <h1 className="text-4xl">Această pagină este indisponibilă!</h1>
        <h2 className="text-lg mt-3">
          Ne pare rău, însă pagina pe care doriți să o accesați nu există, a
          fost ștearsă ori este temporar dezactivată.
        </h2>
        <Link href="/">
          <a className="p-3 bg-blue w-48 mx-auto rounded mt-5 text-darkBlue font-bold hover:-translate-y-1 transition duration-500">
            ÎNAPOI ACASĂ
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
