import { Edit, Eye, Trash2, UserCircle } from "lucide-react";
import { forwardRef } from "react";

const UserRow = forwardRef(({ user, onView, onEdit, onDelete }, ref) => {
  // Determine status color
  const getStatusColor = (status) => {
    return status === "Đang hoạt động"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500";
  };

  return (
    <tr ref={ref} className="hover:bg-muted/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm">{user.id}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <UserCircle className="h-full w-full object-cover text-muted-foreground" />
          ) : (
            <span className="text-lg font-medium uppercase">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium">{user.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-muted-foreground">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            user.status
          )}`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center space-x-2">
          <button
            onClick={onView}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-300"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={onEdit}
            className="text-amber-600 hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-300"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-300"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});

UserRow.displayName = "UserRow";

export default UserRow;
