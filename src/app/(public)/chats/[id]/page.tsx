import React, {FC} from 'react';
import Chats from "@/app/widgets/Chats";

interface ComponentProps {
  params: Promise<{ category: string }>;
}

const Page:FC<ComponentProps> = async ({params}) => {
  const { id } = await params

  return (
    <div>
      <div className="flex gap-[12px]">
        <Chats />
      </div>
    </div>
  );
};

export default Page;