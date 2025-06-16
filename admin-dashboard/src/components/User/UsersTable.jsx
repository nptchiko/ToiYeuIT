import UserRow from "./user-row";
import UserSkeleton from "./user-skeleton";
import { Loader2 } from "lucide-react";

export default function UsersTable({
  users,
  isLoading,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider rounded-tl-lg">
              ID
            </th>
            <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Picture
            </th>
            <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              State
            </th>
            <th className="px-8 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider rounded-tr-lg">
              Operation
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => <UserSkeleton key={index} />)
            : users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onView={() => onView(user)}
                  onEdit={() => onEdit(user)}
                  onDelete={() => onDelete(user)}
                />
              ))}
        </tbody>
      </table>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
          <span className="ml-2 text-muted-foreground">Loading...</span>
        </div>
      )}

      {/* No results message */}
      {users.length === 0 && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          No user found....
        </div>
      )}
    </div>
  );
}
