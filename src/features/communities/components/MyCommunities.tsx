import { requiereAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import React from "react";
import { communityService } from "../services/CommunityService";
import Link from "next/link";
import CommunityItem from "./CommunityItem";
import { community } from '../../../db/schema/community';

export default async function MyCommunities() {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");

  const communities = await communityService.getUserCommunities(session.user);

  return communities.length ? (
    <ul className="mt-10 shadow-10 p-10 divede-y divide-gray-200" role="list">
        {communities.map(community => (
            <CommunityItem key={community.data.id} community={community} />
        ))}
    </ul>
  ) : (
    <p className="text-center mt-10 text-lg">
        NO hay comunidades aún {" "}
      <Link
        href="/dashboard/communities/create"
        className="text-orange-500 font-bold"
      >
        Comienza creando una
      </Link>
    </p>
  );
}
