import { getServices } from "@/_api/services";

import { Props } from "../props";
import Render from "./render";

export default async function List({ searchParams }: Props) {
  const services = await getServices({ search: searchParams.q });

  return <Render services={services} />;
}
