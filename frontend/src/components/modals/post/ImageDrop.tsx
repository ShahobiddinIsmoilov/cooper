import { Flex, Group, Text, Image, rem } from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { MdFileUpload } from "react-icons/md";
import { useState } from "react";

interface Props {
  image: FileWithPath | null;
  setImage: (file: FileWithPath) => void;
}

export default function ImageDrop({ image, setImage }: Props) {
  const [imageUrl, setImageUrl] = useState("");

  return !image ? (
    <Dropzone
      multiple={false}
      maxFiles={1}
      onDrop={(files) => {
        setImage(files[0]);
        setImageUrl(URL.createObjectURL(files[0]));
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      p={12}
    >
      <Group
        justify="center"
        gap="xl"
        mih={100}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Flex className="items-center gap-2">
            <MdFileUpload
              style={{
                width: rem(60),
                height: rem(60),
                color: "var(--mantine-color-dimmed)",
              }}
            />
            <div>
              <Text size="xl" inline>
                Drag your image here or click to select
              </Text>
              <Text c="dimmed" inline mt={7}>
                File size should not exceed 5MB
              </Text>
            </div>
          </Flex>
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  ) : (
    <div className="bg-dark-900 rounded-md relative overflow-hidden">
      <Image src={imageUrl} radius={4} mih={50} mah={700} className="blur-md" />
      <Image
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        radius={4}
        mih={50}
        mah={700}
        fit="contain"
        className="absolute top-0 left-0"
      />
    </div>
  );
}
