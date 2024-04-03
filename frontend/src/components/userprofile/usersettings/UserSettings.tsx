import { useEffect } from "react";

interface Props {
  setActive: (value: string) => void;
}

export default function UserComments({ setActive }: Props) {
  useEffect(() => {
    setActive("settings");
  }, []);

  return (
    <p className="text-xl text-center">There will be settings here one day</p>
  );
}
