"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { StringifyOptions } from "querystring";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_8hzkur09iLc45oFyzjXYWnknsTIO5fQk0YCCbGR2ONhIXxkC9RnXi_IO8M1bL-EV"}>
      <RoomProvider id={params.documentId as StringifyOptions}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}