/* eslint-disable react/no-unescaped-entities */
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import UploadModal from "../components/modals/UploadModal";
import { useState } from "react";
import CreateModal from "../components/modals/CreateModal";
import EditModal from "../components/modals/EditModal";

const BaseLayout = () => {
  // UPLOAD MODAL
  const [isUploadModalOpen, setModalUploadOpen] = useState(false);

  const openUploadModal = () => {
    setModalUploadOpen(true),
      setCreateModalOpen(false),
      setEditModalOpen(false);
  };
  const closeUploadModal = () => setModalUploadOpen(false);

  // CREATE MODAL
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModel = () => {
    setCreateModalOpen(true),
      setModalUploadOpen(false),
      setEditModalOpen(false);
  };
  const closeCreateModal = () => setCreateModalOpen(false);

  //EDIT MODAL
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [spendingId, setSpendingId] = useState("");

  const openEditModal = () => {
    setEditModalOpen(true),
      setModalUploadOpen(false),
      setCreateModalOpen(false);
  };
  const closeEditModal = () => setEditModalOpen(false);

  return (
    <>
      <div className="bg-cover bg-center bg-[url('/gradients/gradient6.jpeg')] pb-4 max-md:w-screen">
        <div className="flex flex-col min-h-screen pt-7 pb-10 max-md:w-screen">
          <Navbar
            openUploadModal={openUploadModal}
            openCreateModal={openCreateModel}
          />
          <Outlet context={[openEditModal, setSpendingId]} />
        </div>
        <footer className="flex-shrink-0 w-full flex justify-end px-10 mt-auto">
          <p className="text-white text-xs opacity-50">
            "Right Track" is a courtesy of Margery Olethea, created for
            educational purposes only.
          </p>
        </footer>
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={closeUploadModal} />
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        openEdit={isEditModalOpen}
        setSpendingId={setSpendingId}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        id={spendingId}
      />
    </>
  );
};
export default BaseLayout;
