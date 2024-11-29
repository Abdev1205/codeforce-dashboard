import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const ContestTableSkeleton: React.FC = () => {
  return (
    <div className="relative border rounded-lg">
      <div className="sticky top-0 z-10 flex">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[10%] text-left">ID</TableHead>
              <TableHead className="w-[40%] text-left">Name</TableHead>
              <TableHead className="w-[15%] text-left">Type</TableHead>
              <TableHead className="w-[15%] text-left">Phase</TableHead>
              <TableHead className="w-[15%] text-left">
                Duration (hrs)
              </TableHead>
              <TableHead className="w-[15%] text-left">Start Time</TableHead>
              <TableHead className="w-[5%] text-left">Fav</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="w-[1rem] bg-gray-100 h-[2.6rem]"></div>
      </div>
      <div className="overflow-y-auto max-h-[60vh]">
        <Table className="w-full table-fixed">
          <TableBody>
            {[...Array(15)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className="w-[10%]">
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="w-[40%]">
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="w-[15%]">
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="w-[15%]">
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="w-[15%]">
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="w-[15%]">
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="w-[5%]">
                  <Skeleton className="w-4 h-4 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContestTableSkeleton;
