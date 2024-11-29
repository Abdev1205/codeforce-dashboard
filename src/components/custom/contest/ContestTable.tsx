import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import PhaseLabel from "../label/PhaseLabel";
import DateLabel from "../label/DateLabel";
import DurationLabel from "../label/DurationLabel";
import ContestTypeLabel from "../label/ContestTypeLabel";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Contest {
  id: number;
  name: string;
  type: string;
  phase: string;
  durationSeconds: number;
  startTimeSeconds: number;
  isFavorite: boolean;
}

interface ContestTableProps {
  currentItems: Contest[];
  onToggleFavorite: (id: number) => void;
}

const ContestTable: React.FC<ContestTableProps> = ({
  currentItems,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative border rounded-lg">
      <div className="sticky top-0 z-10 flex ">
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
            {currentItems.length > 0 ? (
              currentItems.map((contest) => (
                <TableRow key={contest.id} className="cursor-pointer ">
                  <TableCell
                    onClick={() => navigate(`/contest/${contest.id}`)}
                    className="w-[10%]"
                  >
                    {contest.id}
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/contest/${contest.id}`)}
                    className="w-[40%]"
                  >
                    {contest.name}
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/contest/${contest.id}`)}
                    className="w-[15%]"
                  >
                    <ContestTypeLabel type={contest.type} />
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/contest/${contest.id}`)}
                    className="w-[15%]"
                  >
                    <PhaseLabel
                      phase={contest.phase as "BEFORE" | "CODING" | "FINISHED"}
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/contest/${contest.id}`)}
                    className="w-[15%]"
                  >
                    <DurationLabel durationSeconds={contest.durationSeconds} />
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/contest/${contest.id}`)}
                    className="w-[15%]"
                  >
                    <DateLabel timestamp={contest.startTimeSeconds} />
                  </TableCell>
                  <TableCell className="w-[5%]">
                    <button
                      onClick={() => onToggleFavorite(contest.id)}
                      className="text-xl"
                    >
                      {contest.isFavorite ? (
                        <AiFillHeart className="text-red-500" />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No contests available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContestTable;
