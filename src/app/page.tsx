"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job invoked successfully!");
      },
    })
  );

  const [value, setValue] = useState("");

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text to invoke background job"
        className="mb-4"
      ></Input>
      <Button
        disabled={invoke.isPending}
        onClick={() =>
          invoke.mutate({
            value: value,
          })
        }
      >
        Invoke Background Job
      </Button>
    </div>
  );
};

export default page;
