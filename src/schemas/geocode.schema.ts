import { z } from "zod";

const GeocodeDataSchema = z.array(
  z.object({
    name: z.string(),
    local_names: z
      .object({
        ascii: z.string().optional(),
        feature_name: z.string().optional(),
      })
      .catchall(z.string()),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    state: z.string().optional(),
  })
);

export { GeocodeDataSchema };
export type GeocodeData = z.infer<typeof GeocodeDataSchema>;
