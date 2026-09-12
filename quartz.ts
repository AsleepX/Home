import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

registerCondition("index", (page) => page.fileData.slug === "index")

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
