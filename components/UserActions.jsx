import React from "react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { PersonPlusFill, ThreeDotsVertical } from "react-bootstrap-icons";

const UserActions = ({ account }) => {
  return (
    <Menu>
      <MenuButton>
        <ThreeDotsVertical className="text-3xl rotate-90 md:rotate-0" />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<PersonPlusFill className="text-blue text-xl" />}>
          Trimite cerere de prietenie
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserActions;
