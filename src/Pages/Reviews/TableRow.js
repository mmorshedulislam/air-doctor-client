import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const TableRow = ({ review, handleDelete }) => {
  const { _id, serviceId, title, description } = review;

  const [service, setService] = useState([]);
  console.log(service);
  useEffect(() => {
    fetch(
      `https://air-doctor-server.vercel.app/serviceId?serviceId=${serviceId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      });
  }, [serviceId]);

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {service.title}
      </Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>
        <Link
          to={`/updateReview/${_id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Update
        </Link>
      </Table.Cell>
      <Table.Cell className="text-2xl">
        <button onClick={() => handleDelete(_id)}>
          <AiOutlineCloseCircle />
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

export default TableRow;
