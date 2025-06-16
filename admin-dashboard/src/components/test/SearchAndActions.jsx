"use client";

import { Search, Plus } from "lucide-react";

export default function SearchAndActions({
  searchTerm,
  setSearchTerm,
  onAddTest,
  isLoading,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <button
        onClick={onAddTest}
        className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-800 text-white px-4 py-2 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 font-medium"
        disabled={isLoading}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add new test
      </button>
    </div>
  );
}
