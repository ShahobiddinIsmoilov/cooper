import Line from "../../../utils/Line";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { Grid, Stack } from "@mantine/core";
import { span } from "./Account";

interface Props {
  user: UserDetailProps;
}

export default function Social({ user }: Props) {
  return (
    <Stack>
      <div>
        <p className="mb-2 text-xs font-bold tracking-widest">SOCIAL LINKS</p>
        <Line />
      </div>
      <Grid>
        <Grid.Col span={span}>
          <p className="m-1">Telegram:</p>
          <input
            type="text"
            maxLength={200}
            id="telegram"
            name="telegram"
            placeholder={`https://t.me/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
        <Grid.Col span={span}>
          <p className="m-1">Instagram:</p>
          <input
            type="text"
            maxLength={200}
            id="instagram"
            name="instagram"
            placeholder={`https://www.instagram.com/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
        <Grid.Col span={span}>
          <p className="m-1">Facebook:</p>
          <input
            type="text"
            maxLength={200}
            id="facebook"
            name="facebook"
            placeholder={`https://www.facebook.com/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
        <Grid.Col span={span}>
          <p className="m-1">Twitter / X:</p>
          <input
            type="text"
            maxLength={200}
            id="twitter"
            name="twitter"
            placeholder={`https://twitter.com/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
