import React, { useState } from "react";

import { Input, Button, FormLabel, Select, useToast } from "@chakra-ui/react";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ro from "date-fns/locale/ro";
registerLocale("ro", ro);

const SortPosts = ({ sortPosts, resetFilters }) => {
  const [date, setDate] = useState({ from: null, to: null });

  const toast = useToast();

  const resetForm = () => {
    resetFilters();
    setDate({ from: null, to: null });
    document.getElementById("sort").reset();
  };

  const applyFilters = (e) => {
    e.preventDefault();
    const { name, title, upvotes } = e.target;
    if (date.from?.getTime() > date.to?.getTime()) {
      toast({
        title: `Intervalul de timp nu este corect!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    const filters = {
      name: name.value ? name.value.toLowerCase().trim() : null,
      title: title.value ? title.value.toLowerCase().trim() : null,
      upvotes: upvotes.value ? upvotes.value : null,
      modified: true,
      date: date.from && date.to ? date : { from: null, to: null },
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
        className="border-blue mb-1"
        placeholder="Alege o opțiune"
      >
        <option value="ascending">Crescător</option>
        <option value="descending">Descrescător</option>
      </Select>
      <FormLabel className="my-0" htmlFor="votes">
        Interval de timp
      </FormLabel>
      <div className="flex flex row">
        <DatePicker
          locale="ro"
          selected={date.from}
          onChange={(newDate) => setDate({ ...date, from: newDate })}
          className="border-blue css-1c6j008"
          placeholderText="De la..."
          onKeyDown={(e) => e.preventDefault()}
        />
        <DatePicker
          locale="ro"
          selected={date.to}
          onChange={(newDate) => setDate({ ...date, to: newDate })}
          className="border-blue css-1c6j008 ml-1"
          placeholderText="Până la..."
          onKeyDown={(e) => e.preventDefault()}
        />
      </div>
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
