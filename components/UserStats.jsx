import React from "react";

import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

import AnimatedNumber from "react-animated-number";

const UserStats = ({ account }) => {
  return (
    <div className="p-3 my-5 flex flex-row flex-wrap justify-evenly w-full items-center">
      <div className="text-center w-40 h-40 shadow-shadow_nav bg-orange text-white flex items-center m-1">
        <Stat>
          <StatLabel>Postări</StatLabel>
          <StatNumber>
            <AnimatedNumber
              component="text"
              value={account.posts.length}
              stepPrecision={0}
              duration={1500}
            />
          </StatNumber>
        </Stat>
      </div>
      <div className="text-center w-40 h-40 shadow-shadow_nav bg-orange text-white flex items-center m-1">
        <Stat>
          <StatLabel>Postări favorite</StatLabel>
          <StatNumber>
            <AnimatedNumber
              component="text"
              value={account.favorites.length}
              stepPrecision={0}
              duration={1500}
            />
          </StatNumber>
        </Stat>
      </div>
      <div className="text-center w-40 h-40 shadow-shadow_nav bg-orange text-white flex items-center m-1">
        <Stat>
          <StatLabel>Voturi</StatLabel>
          <StatNumber>
            <AnimatedNumber
              component="text"
              value={account?.upvotes}
              stepPrecision={0}
              duration={1500}
            />
          </StatNumber>
        </Stat>
      </div>
      <div className="text-center w-40 h-40 shadow-shadow_nav bg-orange text-white flex items-center m-1">
        <Stat>
          <StatLabel>Prieteni</StatLabel>
          <StatNumber>
            <AnimatedNumber
              component="text"
              value={account?.friends.length}
              stepPrecision={0}
              duration={1500}
            />
          </StatNumber>
        </Stat>
      </div>
      <div className="text-center w-40 h-40 shadow-shadow_nav bg-orange text-white flex items-center m-1">
        <Stat>
          <StatLabel>Comentarii</StatLabel>
          <StatNumber>
            <AnimatedNumber
              component="text"
              value={account?.comments}
              stepPrecision={0}
              duration={1500}
            />
          </StatNumber>
        </Stat>
      </div>
      <div className="text-center w-40 h-40 shadow-shadow_nav bg-orange text-white flex items-center m-1">
        <Stat>
          <StatLabel>Răspunsuri</StatLabel>
          <StatNumber>
            <AnimatedNumber
              component="text"
              value={account?.replies}
              stepPrecision={0}
              duration={1500}
            />
          </StatNumber>
        </Stat>
      </div>
    </div>
  );
};

export default UserStats;
