"use client";

import { useState } from "react";
import { MeetiPermissions } from "../types/meeti.types";
import { toggleAttendance } from "../actions/attendance.action";
import toast from "react-hot-toast";

interface Props {
  meetiId: string;
  permissions: MeetiPermissions;
}
export default function AttendanceToggleButton({
  meetiId,
  permissions,
}: Props) {
  const [canConfirm, setCanConfirm] = useState(permissions.canConfirm);
  /* const [canCancel, setCanCancel] = useState(permissions.canCancel); */

  const handleClick = async () => {
    const { error, success, newPermissions } = await toggleAttendance(
      meetiId,
      canConfirm,
    );
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      setCanConfirm(newPermissions.canConfirm);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={` ${canConfirm ? "bg-orange-600" : "bg-red-600"} font-bold text-lg w-full lg:w-auto rounded-md px-5 py-2 text-white cursor-pointer `}
    >
      {canConfirm ? " Confirmar asistencia" : " Cancelar asistencia"}
    </button>
  );
}
