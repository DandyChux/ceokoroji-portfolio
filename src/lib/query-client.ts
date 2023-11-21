import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queryClient = cache(() => new QueryClient())