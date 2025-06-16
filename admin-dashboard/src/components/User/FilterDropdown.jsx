import { FILTER_OPTIONS } from "../../Constants/user-constants";
import { Filter, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function FilterDropdown({ statusFilter, setStatusFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isDropdownOpen &&
        !event.target.closest(".filter-dropdown-container")
      ) {
        document
          .getElementById("status-filter-dropdown")
          .classList.add("hidden");
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getFilterLabel = (filter) => {
    switch (filter) {
      case FILTER_OPTIONS.ALL:
        return "All Statuses";
      case FILTER_OPTIONS.ACTIVE:
        return "Active";
      case FILTER_OPTIONS.INACTIVE:
        return "InActive";
      default:
        return "All Statuses";
    }
  };

  const handleFilterChange = (newFilter) => {
    setStatusFilter(newFilter);
    document.getElementById("status-filter-dropdown").classList.add("hidden");
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative filter-dropdown-container">
      <button
        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted"
        onClick={() => {
          document
            .getElementById("status-filter-dropdown")
            .classList.toggle("hidden");
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <Filter className="h-4 w-4 mr-1" />
        {getFilterLabel(statusFilter)}
        <ChevronDown className="h-3 w-3 ml-1" />
      </button>
      <div
        id="status-filter-dropdown"
        className="absolute right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-50 hidden"
      >
        <div className="py-1">
          {Object.values(FILTER_OPTIONS).map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 text-sm ${
                statusFilter === option
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => handleFilterChange(option)}
            >
              {getFilterLabel(option)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
