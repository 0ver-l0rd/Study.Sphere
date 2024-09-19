
import("drizzle-kit").Config;

export default {
  schema: "./configs/Schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ss_owner:e8NwCa5GhZSm@ep-spring-shape-a5h9pbjg.us-east-2.aws.neon.tech/coursegen2?sslmode=require,"
  },
};
