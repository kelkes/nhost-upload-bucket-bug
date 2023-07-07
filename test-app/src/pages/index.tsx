import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getNhostSession, useFileUpload } from "@nhost/nextjs";
import { authProtected } from "@/auth-protected";
import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEventHandler, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const IndexPage = () => {
  const [res, setRes] = useState<string>("");
  const { upload } = useFileUpload();
  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const res = await upload({
        file: e.target.files[0],
        bucketId: "test",
      });

      console.log(res);
      setRes(JSON.stringify(res));
    }
  };

  return (
    <Box>
      <Input type="file" onChange={handleChange} />

      <Text>{res}</Text>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const nhostSession = await getNhostSession(
    {
      subdomain: "local",
    },
    ctx
  );

  return {
    props: {
      nhostSession,
    },
  };
};

export default authProtected(IndexPage);
