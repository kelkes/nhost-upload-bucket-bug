import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthenticationStatus, SignedIn } from "@nhost/nextjs";
import { Spinner } from "@chakra-ui/react";

export function authProtected<T>(Comp: NextPage<T>) {
  return function AuthProtected(props: T) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return <Spinner />;
    }

    if (!isAuthenticated) {
      router.push(`/sign-in?rd=${encodeURIComponent(router.asPath)}`);
      return null;
    }
    //@ts-ignore
    return <Comp {...props} />;
  };
}
