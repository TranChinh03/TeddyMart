import React from "react";
import { FaBeer } from "react-icons/fa";
import { DatePicker } from "antd";
const DashBoard = () => {
  return (
    <>
      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div class="shrink-0">
          <img
            class="h-12 w-12"
            src={
              "https://cdn.haitrieu.com/wp-content/uploads/2022/08/logo-quan-6-tphcm.png"
            }
            alt="ChitChat Logo"
          />
        </div>
        <div>
          <div class="text-xl font-medium text-black">ChitChat</div>
          <p class="text-slate-500">You have a new message!</p>
        </div>
      </div>
      <h3 className="row-auto w-24 border border-red">
        Lets go for a <FaBeer size={24} />
      </h3>
      <table class="table-auto border w-100 h-150">
        <thead>
          <tr>
            <th class="font-bold">Name</th>
            <th class="font-bold">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>25</td>
          </tr>
        </tbody>
      </table>
      <DatePicker format={"DD/MM/YYYY"} className="w-max " />
    </>
  );
};
export default DashBoard;
