import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contest } from "@/hooks/useContests";
import { useNavigate } from "react-router-dom";
import ContestTypeLabel from "../label/ContestTypeLabel";
import PhaseLabel from "../label/PhaseLabel";
import DurationLabel from "../label/DurationLabel";
import { Button } from "@/components/ui/button";
import { generateGoogleCalendarLink } from "@/lib/utils";
import Image from "../Image";
import { CalendarImage } from "@/assets/assetManger";
import DateLabel from "../label/DateLabel";

interface SimilarContestProps {
  contest: Contest;
  contestLink: string;
}

const SimilarContest = ({ contest, contestLink }: SimilarContestProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <CardHeader>
        <CardTitle className=" font-openSans font-[600] text-[1.25rem] ">
          Similar Contest
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-[1rem] flex-wrap">
          {JSON.parse(localStorage.getItem("cachedContests") || "[]")
            .filter(
              (similarContest: Contest) =>
                similarContest.type === contest.type &&
                similarContest.id !== contest.id
            )
            .slice(0, 5)
            .map((similarContest: Contest) => (
              <Card className="flex w-[40rem] gap-[.8rem] px-[1.5rem] py-[1.5rem] rounded-[.5rem] justify-between">
                <div>
                  <h1
                    onClick={() => navigate(`/contest/${similarContest.id}`)}
                    className="text-[1.3rem] cursor-pointer font-bold line-clamp-1 "
                  >
                    {similarContest.name}
                  </h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <ContestTypeLabel type={similarContest.type} />
                    <PhaseLabel
                      phase={
                        similarContest.phase as "BEFORE" | "CODING" | "FINISHED"
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <span>Total Time: </span>
                    <DurationLabel
                      durationSeconds={similarContest.durationSeconds}
                    />
                  </div>
                  <Button
                    onClick={() =>
                      window.location.replace(
                        "https://codeforces.com/contestRegistration/" +
                          similarContest.id
                      )
                    }
                    className=" mt-[1rem] text-white rounded bg-primary hover:bg-[#3679e6] w-[10rem] "
                    disabled={similarContest.phase !== "BEFORE"}
                  >
                    {similarContest.phase === "BEFORE"
                      ? "Join Contest"
                      : "Contest Unavailable"}
                  </Button>
                </div>
                <div>
                  <div
                    onClick={() =>
                      window.location.replace(
                        generateGoogleCalendarLink(contest, contestLink)
                      )
                    }
                    className="flex items-center cursor-pointer"
                  >
                    <Image
                      src={CalendarImage}
                      className="w-[2.5rem]"
                      delay={false}
                    />
                    <Button className="bg-blue-500 hover:bg-blue-700 text-[.8rem] px-[.4rem] pl-[1rem] rounded-[.3rem] h-[2rem] text-white ml-[-.5rem]">
                      Add to Calendar
                    </Button>
                  </div>
                  <DateLabel
                    timestamp={similarContest.startTimeSeconds}
                    individual
                  />
                </div>
              </Card>
            ))}
        </div>
      </CardContent>
    </div>
  );
};

export default SimilarContest;
