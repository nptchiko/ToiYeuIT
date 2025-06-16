import { Search, UserPlus } from "lucide-react";

export default function SearchAndActions({
  searchTerm,
  setSearchTerm,
  onAddUser,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Searching for users...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full sm:w-64 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <button
        onClick={onAddUser}
        className="bg-gradient-to-r from-primary to-blue-500 text-foreground px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </button>
    </div>
  );
}
