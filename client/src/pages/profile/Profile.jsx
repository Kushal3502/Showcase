import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

function Profile() {
  return (
    <div className="flex justify-center">
      <Card className="bg-transparent text-white lg:w-[800px] w-96">
        <CardHeader>Info</CardHeader>
        <CardContent>content</CardContent>
      </Card>
    </div>
  );
}

export default Profile;
