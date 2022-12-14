import { Label, Pagination, Select, Spinner } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import useSetTitle from "../../CustomHooks/useSetTitle";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const { loading } = useContext(AuthContext);
  useSetTitle("Services");
  const [services, setServices] = useState([]);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(count / perPage);

  useEffect(() => {
    fetch(
      `https://air-doctor-server.vercel.app/services?perPage=${perPage}&currentPage=${currentPage},`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCount(data.count);
        setServices(data.services);
        loading(false);
      });
  }, [perPage, currentPage, loading]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div>
      {/* Section Heading */}
      <div className="section-heading my-10">
        <p className="text-2xl text-center text-[#9EC23C]">Our Services</p>
        <h2 className="text-2xl lg:text-6xl text-center font-bold">
          {" "}
          Psychological Services
        </h2>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 lg:px-0">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>

      {/* Pagination */}
      <div className="text-center my-10">
        <p>
          Current Page: {currentPage + 1}. Per Page: {perPage}
        </p>
        {[...Array(pages).keys()].map((num) => (
          <button
            onClick={() => setCurrentPage(num)}
            className="py-1 px-2 text-xl bg-red-200 border border-r-slate-500"
          >
            {num + 1}
          </button>
        ))}
      </div>

      <div id="select" className="mx-5">
        <div className="mb-2 block mx-3">
          <Label htmlFor="countries" value="Per Page Show" />
        </div>
        <Select
          onChange={(event) => setPerPage(event.target.value)}
          className="w-32"
          id="countries"
          required={true}
        >
          <option value={3}>3</option>
          <option value={6} selected>
            6
          </option>
          <option value={9}>9</option>
          <option value={15}>15</option>
        </Select>
      </div>
    </div>
  );
};

export default Services;
