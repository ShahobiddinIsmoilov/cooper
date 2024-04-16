import { Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { FaTrashAlt } from "react-icons/fa";
import Account from "./Account";
import Social from "./Social";
import Line from "../../../utils/Line";

interface Props {
  user: UserDetailProps;
  setActive: (value: string) => void;
}

export default function UserComments({ setActive, user }: Props) {
  useEffect(() => {
    setActive("settings");
  }, []);

  const initialDisplayName = user.display_name ? user.display_name : "";
  const initialPhone = user.phone ? user.phone : "";
  const initialTelegram = user.telegram ? user.telegram : "";
  const initialInstagram = user.instagram ? user.instagram : "";
  const initialFacebook = user.facebook ? user.facebook : "";
  const initialTwitter = user.twitter ? user.display_name : "";

  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [phone, setPhone] = useState(initialPhone);
  const [telegram, setTelegram] = useState(initialTelegram);
  const [instagram, setInstagram] = useState(initialInstagram);
  const [facebook, setFacebook] = useState(initialFacebook);
  const [twitter, setTwitter] = useState(initialTwitter);

  function enableButtons() {
    if (displayName !== initialDisplayName) return true;
    if (phone !== initialPhone) return true;
    if (telegram !== initialTelegram) return true;
    if (instagram !== initialInstagram) return true;
    if (facebook !== initialFacebook) return true;
    if (twitter !== initialTwitter) return true;
    return false;
  }

  function discard() {
    setDisplayName(initialDisplayName);
    setPhone(initialPhone);
    setTelegram(initialTelegram);
    setInstagram(initialInstagram);
    setFacebook(initialFacebook);
    setTwitter(initialTwitter);
  }

  return (
    <Stack gap={32}>
      <div className="gap-2 flex justify-end items-center -mb-4">
        <Button
          onClick={discard}
          disabled={!enableButtons()}
          className={`px-3 rounded-xl bg-transparent border border-line ${
            enableButtons() && "hover:bg-dark-700"
          }`}
        >
          Discard changes
        </Button>
        <Button
          disabled={!enableButtons()}
          className={`px-3 rounded-xl ${
            enableButtons()
              ? "bg-cyan-600 hover:bg-cyan-500"
              : "bg-dark-600 text-dark-900"
          }`}
        >
          Save changes
        </Button>
      </div>
      <Account
        user={user}
        displayName={displayName}
        phone={phone}
        setDisplayName={setDisplayName}
        setPhone={setPhone}
        enableButtons={enableButtons}
      />
      <Social user={user} />
      <div>
        <p className="mb-2 text-xs font-bold tracking-widest">DELETE ACCOUNT</p>
        <Line />
      </div>
      <button className="w-fit text-red-400 flex items-center gap-1">
        <FaTrashAlt />
        Delete account
      </button>
    </Stack>
  );
}
