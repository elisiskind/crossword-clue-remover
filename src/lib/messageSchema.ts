import { z } from "zod";

export const cluesVisibilityMessageSchema = z.object({
  type: z.literal("show-clues"),
  value: z.boolean(),
});

export type CluesVisibilityMessage = z.infer<
  typeof cluesVisibilityMessageSchema
>;

export class Messaging {
  static readonly isCluesVisibilityMessage = (
    message: unknown,
  ): message is CluesVisibilityMessage => {
    return cluesVisibilityMessageSchema.safeParse(message).success;
  };

  static readonly sendCluesVisibilityMessage = async (
    value: boolean,
    id: number,
  ) => {
    const message = {
      type: "show-clues",
      value,
    } as const satisfies CluesVisibilityMessage;

    await chrome.tabs.sendMessage(id, message);
  };
}
