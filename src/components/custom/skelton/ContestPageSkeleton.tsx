import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ContestPageSkeleton: React.FC = () => {
  return (
    <div className="px-16 mt-12 space-y-8">
      {/* Contest Overview Skeleton */}
      <Card className="flex justify-between px-6 py-6 rounded-lg">
        <div className="w-full space-y-4">
          <Skeleton className="w-3/4 h-8" />
          <div className="flex items-center space-x-4">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="mt-4">
            <Skeleton className="w-1/2 h-6" />
          </div>
          <Skeleton className="w-40 h-10 mt-4" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-10 w-32 ml-[-0.5rem]" />
          </div>
          <Skeleton className="w-40 h-6" />
        </div>
      </Card>

      {/* Rules Section Skeleton */}
      <div className="rounded-lg">
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-1/3 h-7" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="w-full h-5" />
            ))}
          </div>
        </CardContent>
      </div>

      {/* Similar Contests Skeleton */}
      <div>
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-1/3 h-7" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {[1, 2].map((contest) => (
              <Card
                key={contest}
                className="flex w-[40rem] gap-4 px-6 py-6 rounded-lg justify-between"
              >
                <div className="w-full space-y-4">
                  <Skeleton className="w-3/4 h-7" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-24 h-6" />
                    <Skeleton className="w-24 h-6" />
                  </div>
                  <div className="mt-4">
                    <Skeleton className="w-1/2 h-6" />
                  </div>
                  <Skeleton className="w-40 h-10 mt-4" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-8 w-32 ml-[-0.5rem]" />
                  </div>
                  <Skeleton className="w-40 h-6" />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ContestPageSkeleton;
