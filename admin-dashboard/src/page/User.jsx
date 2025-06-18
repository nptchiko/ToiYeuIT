// Modal Components
import { MODAL_TYPES } from "../Constants/user-constants";
import FilterDropdown from "../components/User/FilterDropdown";
import Pagination from "../components/User/Pagination";
import SearchAndActions from "../components/User/SearchAndActions";
// Components
import UserStats from "../components/User/UserStats";
import UsersTable from "../components/User/UsersTable";
import AddUserModal from "../components/User/add-user-modal";
import DeleteUserModal from "../components/User/delete-user-modal";
import EditUserModal from "../components/User/edit-user-modal";
import ViewUserModal from "../components/User/view-user-modal";
import { useFormManagement } from "../hooks/use-form-management";
import { useModalManagement } from "../hooks/use-modal-management";
import { useUsersData } from "../hooks/use-users-data";
import { UserCrudService } from "../services/user-crud-service.js";

export default function UsersPage() {
  // Custom hooks
  const {
    filteredUsers,
    stats,
    setStats,
    users,
    setUsers,
    setDisplayedUsers,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    handlePageChange,
    handlePageSizeChange,
    fetchUsers,
  } = useUsersData();

  const { activeModal, selectedUser, openModal, closeModal } =
    useModalManagement();

  const {
    editFormData,
    newUserData,
    handleEditInputChange,
    handleNewUserInputChange,
    resetNewUserForm,
    setEditFormFromUser,
  } = useFormManagement();

  // Modal handlers
  const handleOpenModal = (modalType, user = null) => {
    openModal(modalType, user);
    if (modalType === MODAL_TYPES.EDIT && user) {
      setEditFormFromUser(user);
    }
  };

  // CRUD operations
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await UserCrudService.updateUser(
        selectedUser.id,
        editFormData,
        selectedUser
      );

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? updatedUser : user
      );

      setUsers(updatedUsers);
      setDisplayedUsers(updatedUsers);
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error.message || "Có lỗi xảy ra khi cập nhật người dùng");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await UserCrudService.createUser(newUserData);

      setUsers((prevUsers) => [newUser, ...prevUsers]);
      setDisplayedUsers((prevDisplayed) => [newUser, ...prevDisplayed]);

      setStats((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers + 1,
        totalStudents:
          newUserData.role === "USER"
            ? prev.totalStudents + 1
            : prev.totalStudents,
        newRegistrations: prev.newRegistrations + 1,
      }));

      closeModal();
      resetNewUserForm();
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      alert(error.message || "Có lỗi xảy ra khi thêm người dùng mới");
    }
  };

  const confirmDeleteUser = async () => {
    try {
      await UserCrudService.deleteUser(selectedUser.id);

      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setDisplayedUsers(updatedUsers);

      setStats((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        totalStudents:
          selectedUser.role === "USER"
            ? prev.totalStudents - 1
            : prev.totalStudents,
      }));

      closeModal();

      if (updatedUsers.length === 0 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Có lỗi xảy ra khi xóa người dùng");
    }
  };

  return (
    <div className="p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              User Management
            </span>
          </h1>

          <SearchAndActions
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddUser={() => handleOpenModal(MODAL_TYPES.ADD)}
          />
        </div>

        {/* Stats Cards */}
        <UserStats stats={stats} isLoading={isLoading} />

        {/* Users Table */}
        <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">
                User List
              </h2>
              <div className="flex items-center gap-2">
                <FilterDropdown
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
              </div>
            </div>

            <UsersTable
              users={filteredUsers}
              isLoading={isLoading}
              onView={(user) => handleOpenModal(MODAL_TYPES.VIEW, user)}
              onEdit={(user) => handleOpenModal(MODAL_TYPES.EDIT, user)}
              onDelete={(user) => handleOpenModal(MODAL_TYPES.DELETE, user)}
            />

            {/* Pagination Controls */}
            {filteredUsers.length > 0 && !isLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === MODAL_TYPES.VIEW && selectedUser && (
        <ViewUserModal user={selectedUser} onClose={closeModal} />
      )}

      {activeModal === MODAL_TYPES.EDIT && selectedUser && (
        <EditUserModal
          user={selectedUser}
          formData={editFormData}
          onInputChange={handleEditInputChange}
          onSubmit={handleEditSubmit}
          onClose={closeModal}
        />
      )}

      {activeModal === MODAL_TYPES.ADD && (
        <AddUserModal
          formData={newUserData}
          onChange={handleNewUserInputChange}
          onSubmit={handleAddSubmit}
          onClose={closeModal}
        />
      )}

      {activeModal === MODAL_TYPES.DELETE && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onConfirm={confirmDeleteUser}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
