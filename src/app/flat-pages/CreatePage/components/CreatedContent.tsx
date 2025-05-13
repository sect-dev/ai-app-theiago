import Image from "next/image";

interface Content {
	created_at?: string;
	nsfw?: boolean;
	url: string;
	request?: string;
	hasVideo?: boolean;
}

interface Props {
	content: Content[];
}

const CreatedContent = (props: Props) => {
	const {content} = props;


	return (
		<div className="grid grid-cols-2 gap-[12px]">
          {content.map((item) => (
            <div key={item.url} className="relative rounded-lg overflow-hidden h-[181px] w-[144px]">
              <Image src={item.url} alt="assembled content" fill className="object-cover" />
            </div>
          ))}
        </div>
	)
}

export default CreatedContent;