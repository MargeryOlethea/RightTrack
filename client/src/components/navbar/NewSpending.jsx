/* eslint-disable react/prop-types */
import { Dropdown } from "flowbite-react";

const NewSpending = ({ openUploadModal, openCreateModal }) => {
  return (
    <>
      <Dropdown
        label="New Spending"
        dismissOnClick={false}
        className="text-slate-800 font-medium text-lg rounded-lg border-none max-md:text-xs"
        style={{
          color: "white",
          backgroundImage: "linear-gradient(to right, #1c64f4, #e9548f)",
          padding: "0px 5px",
          fontWeight: "bold",
          borderRadius: "9999px",
        }}
      >
        <Dropdown.Item onClick={() => openCreateModal()}>
          Input Manually
        </Dropdown.Item>
        <Dropdown.Item onClick={() => openUploadModal()}>
          Upload Receipt
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default NewSpending;
