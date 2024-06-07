import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [folderId, setFolderId] = useState("1qGwpjmQIQO8rN1odas0njDSf72VRrTCa");
  const [isGridView, setIsGridView] = useState(false);
  const [formData, setFormData] = useState({
    folder_id: "",
  });
  return (
    <div className="w-full h-screen p-5">
      <div>Welcome to GDrive!!</div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold font-lg">Google Drive Folder</h1>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              setIsGridView(false);
            }}
            className="btn btn-primary"
          >
            List
          </button>
          <button
            onClick={(e) => {
              setIsGridView(true);
            }}
            className="btn btn-primary"
          >
            Grid
          </button>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            document.getElementById("addModal").showModal();
          }}
        >
          Change folder ID
        </button>
      </div>

      <div className="py-5">
        <div className="flex flex-col w-full pt-5 h-screen">
          <iframe
            src={`https://drive.google.com/embeddedfolderview?id=${folderId}#${
              isGridView ? "grid" : "list"
            }`}
            className="h-screen"
          ></iframe>
        </div>
      </div>

      <dialog id="addModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div className="flex flex-col gap-5 py-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Folder ID</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={formData.folder_id}
                onChange={(e) => {
                  setFormData({ ...formData, folder_id: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="modal-action">
            <div className="flex flex-row justify-between w-full">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  setFolderId(formData.folder_id);
                  document.getElementById("addModal").close();
                }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;
