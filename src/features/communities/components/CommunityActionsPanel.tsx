import Link from "next/link";
import { CommunityPermissions } from "../types/communityTypes";
import CommunityMemberShip from "./CommunityMemberShip";

interface Props {
  permissions: CommunityPermissions;
  communityId: string;
}

export default function CommunityActionsPanel({
  permissions,
  communityId,
}: Props) {
  return (
    <div className="flex justify-end">
      {permissions.canEdit && (
        <Link
          className="font-bold text-lg rounded-md bg-orange-600 px-5 py-2 text-white"
          target="_blank"
          href={`/dashboard/communities/${communityId}/edit`}
        >
          Editar Comunidad
        </Link>
      )}

      {permissions.canJoin || permissions.canLeave ? (
        <CommunityMemberShip
        permissions={permissions}
        communityId={communityId}
        />
      ) : null}
    </div>
  );
}
