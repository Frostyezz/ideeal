import React from "react";

import { Input, Button, FormLabel, Select } from "@chakra-ui/react";

const SortPosts = ({ sortPosts, resetFilters }) => {
  const resetForm = () => {
    resetFilters();
    document.getElementById("sort").reset();
  };

  const applyFilters = (e) => {
    e.preventDefault();
    const { name, title, upvotes } = e.target;
    const filters = {
      name: name.value ? name.value.toLowerCase().trim() : null,
      title: title.value ? title.value.toLowerCase().trim() : null,
      upvotes: upvotes.value ? upvotes.value : null,
      modified: true,
    };
    sortPosts(filters);
  };

  return (
    <form id="sort" onSubmit={(e) => applyFilters(e)} className="flex flex-col">
      <h1 className="font-bold text-lg text-center mb-5">Sortează după:</h1>
      <div className="flex flex-row">
        <div className="flex flex-col mr-1">
          <FormLabel className="my-0" htmlFor="name">
            Numele autorului
          </FormLabel>
          <Input className="border-blue mb-1" id="name" name="name" />
        </div>
        <div className="flex flex-col ml-1">
          <FormLabel className="my-0" htmlFor="title">
            Titlul postării
          </FormLabel>
          <Input className="border-blue mb-1" name="title" id="title" />
        </div>
      </div>
      <FormLabel className="my-0" htmlFor="votes">
        Numărul de voturi
      </FormLabel>
      <Select
        name="upvotes"
        id="votes"
        className="border-blue"
        placeholder="Alege o opțiune"
      >
        <option value="ascending">Crescător</option>
        <option value="descending">Descrescător</option>
      </Select>
      <Button type="submit" colorScheme="blue" className="my-2">
        Aplică filtrele
      </Button>
      <Button onClick={() => resetForm()} colorScheme="gray">
        Resetează filtrele
      </Button>
    </form>
  );
};

export default SortPosts;
