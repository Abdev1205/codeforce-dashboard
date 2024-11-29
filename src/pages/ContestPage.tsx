import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DateLabel from "@/components/custom/label/DateLabel";
import Image from "@/components/custom/Image";
import { Button } from "@/components/ui/button";
import { CalendarImage } from "@/assets/assetManger";
import ContestTypeLabel from "@/components/custom/label/ContestTypeLabel";
import PhaseLabel from "@/components/custom/label/PhaseLabel";
import DurationLabel from "@/components/custom/label/DurationLabel";
import ContestPageSkeleton from "@/components/custom/skelton/ContestPageSkeleton";
import { Contest } from "@/hooks/useContests";
import { generateGoogleCalendarLink } from "@/lib/utils";
import SimilarContest from "@/components/custom/contest/SimilarContest";
import ContestRule from "@/components/custom/contest/ContestRule";

const ContestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [contest, setContest] = useState<Contest | null>(null);

  useEffect(() => {
    const cachedContests = localStorage.getItem("cachedContests");
    if (!cachedContests) {
      setLoading(false);
      return;
    }

    try {
      const parsedContests: Contest[] = JSON.parse(cachedContests);
      if (id) {
        const foundContest = parsedContests.find(
          (contest) => contest.id === parseInt(id, 10)
        );
        setContest(foundContest || null);
      }
    } catch (err) {
      console.error("Error parsing cached contests:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const contestLink = `https://codeforces.com/contestRegistration/${id}`;

  if (loading) {
    return <ContestPageSkeleton />;
  }

  if (!contest) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contest Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The requested contest could not be found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="px-[4rem] mt-[3rem] space-y-8">
      {/* Contest Overview */}
      <Card className="flex px-[1.5rem] py-[1.5rem] rounded-[.5rem] justify-between">
        <div>
          <h1 className="text-2xl font-bold">{contest.name}</h1>
          <div className="flex items-center mt-2 space-x-4">
            <ContestTypeLabel type={contest.type} />
            <PhaseLabel
              phase={contest.phase as "BEFORE" | "CODING" | "FINISHED"}
            />
          </div>
          <div className="mt-4">
            <span>Total Time: </span>
            <DurationLabel durationSeconds={contest.durationSeconds} />
          </div>
          <Button
            className=" mt-[1rem] text-white rounded bg-primary hover:bg-[#3679e6] w-[10rem] "
            disabled={contest.phase !== "BEFORE"}
          >
            {contest.phase === "BEFORE"
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
            <Image src={CalendarImage} className="w-12" delay={false} />
            <Button className="bg-blue-500 hover:bg-blue-700 text-white ml-[-.5rem]">
              Add to Calendar
            </Button>
          </div>
          <DateLabel timestamp={contest.startTimeSeconds} individual />
        </div>
      </Card>

      {/* Rules Section */}
      <ContestRule />

      {/* Similar Contests */}
      <SimilarContest contest={contest} contestLink={contestLink} />
    </div>
  );
};

export default ContestPage;
