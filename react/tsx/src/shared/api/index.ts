import createClient from "openapi-fetch";

import type { paths } from "./api.d.ts";


export const api = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_HOST,
  //betApi: process.env.BETAPI_ENABLED,
});
