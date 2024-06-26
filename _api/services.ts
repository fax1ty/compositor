import { supabase } from "@/supabase";

import { Service } from "./services.types";

interface GetServicesOptions {
  search?: string;
}

export const getServices = async (options?: GetServicesOptions) => {
  let query = supabase.from("services").select("*");
  if (options?.search) query = query.textSearch("name", options.search);
  query = query.limit(10);

  const { data } = await query;
  return data || [];
};

export const getService = async (id: Service["id"]) => {
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();
  return data;
};
