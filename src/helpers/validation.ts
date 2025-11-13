import z from "zod";

export const requiredField = () => {
  return z.string().min(1, { message: "This field is required" });
};
