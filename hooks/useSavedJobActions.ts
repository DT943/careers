"use client";

import { useDeleteMutation, usePostMutation, queryKeys } from "./useApi";

// Save a job offer by ID (body: { JobOfferId: number })
export const useSaveJobOffer = () =>
  usePostMutation(
    "/career/SavedJob/save",
    undefined,
    [queryKeys.auth.savedJobs]
  );

// Unsave a job offer by ID using /unsave/{id}
export const useUnsaveJobOffer = () =>
  useDeleteMutation(
    "/career/SavedJob/unsave/:id",
    undefined,
    [queryKeys.auth.savedJobs]
  );


