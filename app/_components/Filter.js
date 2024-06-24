"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FilterButton from "./FilterButton";

function Filter() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathName = usePathname();
  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString().toLowerCase()}`);
  };

  const activeFilter = searchParams.get("capacity") ?? "all";

  return (
    <div className=" border border-primary-800 flex ">
      <FilterButton
        activeFilter={activeFilter}
        filter="all"
        handleFilter={handleFilter}
      >
        All cabins
      </FilterButton>
      <FilterButton
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        filter="small"
      >
        1&mdash;3 guest
      </FilterButton>
      <FilterButton
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        filter="medium"
      >
        4&mdash;7 guest
      </FilterButton>
      <FilterButton
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="large"
      >
        8&mdash;12 guest
      </FilterButton>
    </div>
  );
}

export default Filter;
