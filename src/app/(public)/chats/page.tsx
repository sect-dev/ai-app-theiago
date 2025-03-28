import React, { Suspense } from 'react';
import Chatspage from "@/app/flat-pages/Chatspage";
import ChatsListSkeleton from "@/app/widgets/Chats/ChatsList/ChatsListSkeleton";

const Page = () => {
  return (
    <Suspense fallback={<ChatsListSkeleton />}>
      <Chatspage />
    </Suspense>
  );
};

export default Page;