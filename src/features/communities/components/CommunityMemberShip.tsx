"use client";

import { useState } from "react";
import { CommunityPermissions } from "../types/communityTypes";
import { toggleMemberShipAction } from "../actions/membership.action";
import toast from "react-hot-toast";

interface Props {
  permissions: CommunityPermissions;
  communityId: string;
}
export default function CommunityMemberShip({
  permissions,
  communityId,
}: Props) {
  const [canJoin, setCanJoin] = useState(permissions.canJoin);
  /* const [canLeave, setCanLeave] = useState(permissions.canLeave); */

  const handleClick = async () => {
    const result = await toggleMemberShipAction(communityId);
    if (result?.success) {
      toast.success(result.message);
      setCanJoin(result.newPermissions.canJoin);
      /* setCanLeave(result.newPermissions.canLeave); */
    }
  };

  return (
    <>
      {/*  {canJoin && (
        <button
          onClick={handleClick}
          className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-orange-600"
        >
          Incribirme a la comunidad
        </button>
      )}

      {canLeave && (
        <button
          onClick={handleClick}
          className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-red-600"
        >
          abandonar de la comunidad
        </button>
      )} */}

      <button
        onClick={handleClick}
        className={` ${canJoin ? "bg-orange-600" : "bg-red-600"} font-bold text-lg w-full lg:w-auto rounded-md px-5 py-2 text-white cursor-pointer `}
      >
        {canJoin ? " Incribirme a la comunidad" : " Abandonar la comunidad"}
      </button>
    </>
  );
}
