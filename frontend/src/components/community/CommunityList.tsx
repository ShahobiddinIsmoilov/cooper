import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import CommunityCard from "./CommunityCard";

export interface CommunityProps {
  owner: string;
  name: string;
  title: string;
  bio: string;
  description: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  rules: string;
  members: number;
}

function CommunityList() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    getCommunities();
  }, []);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function getCommunities() {
    try {
      const response = await axios.get(
        `${baseURL}/api/community/list/`,
        options
      );
      if (response.status === 200) {
        setCommunities(response.data);
      }
    } catch (error) {
      return (
        <>
          <Typography variant="h3">Couldn't load data</Typography>
        </>
      );
    }
  }
  return (
    <Stack direction="column">
      {communities.map((community: CommunityProps) => (
        <CommunityCard key={community.name} community={community} />
      ))}
    </Stack>
  );
}

export default CommunityList;
