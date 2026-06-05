import app from "./app.js";
import config from "./config/env.config.js";

app.listen(config.main_port, () => {
  console.log(`Main Server is running on port ${config.main_port}`);
});
