import { Image } from "@mantine/core";

export default function ImageViewer({ imageUrl }: { imageUrl: string }) {
  const baseDir = "C:/Users/Triton/Desktop/cooper/backend";
  const sampleUrl = "../../../../src/assets/post/domla.png";

  return (
    <div className="bg-dark-900 rounded-xl relative overflow-hidden">
      <Image
        src={sampleUrl}
        radius={4}
        mih={50}
        mah={500}
        className="blur-3xl opacity-50"
      />
      <Image
        src={sampleUrl}
        radius={4}
        mih={50}
        mah={500}
        fit="contain"
        className="absolute top-0 left-0 border border-white border-opacity-25 rounded-xl"
      />
    </div>
  );
}
