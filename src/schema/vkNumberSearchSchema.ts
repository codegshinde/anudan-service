import { z } from "zod";

export const vkNumberSearchSchema = z.object({
  aadhaarNumber: z.string({ required_error: "आधार कार्ड नंबर भरा" }),
});
