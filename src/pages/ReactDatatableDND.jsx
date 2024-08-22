import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

const Task = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
        {title}
      </td>
      <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
        {title}
      </td>
    </>
  );
};

const Column = ({ tasks }) => {
  return (
    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      {tasks.map((task, index) => {
        return (
          <tr key={task.id} className="w-full">
            <Task id={task.id} title={task.title} />
          </tr>
        );
      })}
    </SortableContext>
  );
};

const ReactDatatableDND = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "test" },
    { id: 2, title: "test2" },
    { id: 3, title: "test3" },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (ev) => {
    const { active, over } = ev;
    console.log(active);

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const columns = [
    {
      name: "Company",
      selector: (row) => row.companyName,
    },
    {
      name: "Corporate TIN",
      selector: (row) => row.corporateTin,
    },
  ];

  // const data = [
  //   {
  //     id: 1,
  //     title: "Beetlejuice",
  //     year: "1988",
  //   },
  //   {
  //     id: 2,
  //     title: "Ghostbusters",
  //     year: "1984",
  //   },
  // ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async (page) => {
    setLoading(true);

    const response = await axios.get(
      `http://localhost:3000/paginateCompany?page=${page}&limit=${perPage}`
    );

    console.log(response.data);

    setData(response.data.data);
    setTotalRows(response.data.pagination.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      `http://localhost:3000/paginateCompany?page=${page}&limit=${newPerPage}`
    );

    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, []);
  return (
    <>
      {/* <div className="bg-slate-200 w-full p-5">
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <table className="table w-full">
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
              </tr>
            </thead>
            <tbody>
              <Column tasks={tasks}></Column>
            </tbody>
          </table>
        </DndContext>
      </div> */}

      {/* <div className=" bg-slate-200">
        <div className="p-5">
          <DataTable columns={columns} data={data} reorder={true}></DataTable>
        </div>
      </div> */}

      <DataTable
        title="Users"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default ReactDatatableDND;
