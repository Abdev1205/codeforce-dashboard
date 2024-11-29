import { useState, useEffect } from "react";
import ContestTypeSelect from "../select/ContestTypeSelect";
import CustomPagination from "../CustomPagination";
import contestTypeOptions from "@/constants/contestTypeOptions";
import ContestTable from "./ContestTable";
import ContestTableSkeleton from "../skelton/ContestTableSkeleton";
import useContests from "@/hooks/useContests"; // Assuming the hook is in hooks/useContests.ts

const Contest = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedType, setSelectedType] = useState<string>("");

  const {
    contests,
    loading,
    toggleFavorite,
    setSelectedType: setSelectedTypeFromHook,
    selectedType: selectedTypeFromHook,
    totalContests,
  } = useContests({
    initialType: selectedType,
  });

  useEffect(() => {
    setSelectedType(selectedTypeFromHook);
  }, [selectedTypeFromHook]);

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contests.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(totalContests / itemsPerPage);

  return (
    <div className="px-[4rem] w-full pt-[1rem] h-full">
      {/* Contest Type Select */}
      <div className="w-full h-[3.5rem] flex items-center justify-between">
        <h1 className="text-[1.5rem] font-openSans font-[600] text-primary">
          Contests
        </h1>

        <div className="w-fit">
          <ContestTypeSelect
            options={contestTypeOptions}
            selected={selectedType}
            onChange={(type) => {
              setSelectedType(type);
              setSelectedTypeFromHook(type); // Sync state with the hook
            }}
          />
        </div>
      </div>

      {/* Contest Table */}
      <div className="mt-[1rem] h-[calc(100%-9.5rem)]">
        {loading ? (
          <ContestTableSkeleton />
        ) : (
          <ContestTable
            onToggleFavorite={toggleFavorite}
            currentItems={currentItems}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="">
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default Contest;
