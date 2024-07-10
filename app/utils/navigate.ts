import { redirect } from "@remix-run/node";
import qs from "qs";

export function redirectToSignin(originPath?: string) {
  if (!originPath) {
    return redirect(`/signin`);
  }

  return redirect(`/signin?redirect=${encodeURIComponent(originPath)}`);
}

export function redirectOriginPath(defaultUrl?: string) {
  const { redirect: redirectPath } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const ele = document.createElement("a");
  ele.href = (redirectPath as string) || defaultUrl || "/pages/home";

  document.body.appendChild(ele);
  ele.click();
  document.body.removeChild(ele);
}
