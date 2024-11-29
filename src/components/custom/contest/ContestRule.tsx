import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContestRule = () => {
  return (
    <div className="rounded-[.5rem] ">
      <CardHeader>
        <CardTitle className=" font-openSans font-[600] text-[1.25rem] ">
          Contest Rules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc list-inside ml-[.8rem] ">
          <li>Participants must register before the contest starts.</li>
          <li>Usage of external resources during the contest is prohibited.</li>
          <li>Make sure to submit solutions within the contest duration.</li>
          <li>Each submission will be judged automatically.</li>
          <li>Respect the Codeforces community guidelines.</li>
        </ul>
      </CardContent>
    </div>
  );
};

export default ContestRule;
