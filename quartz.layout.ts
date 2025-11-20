import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Recent Notes",
        limit: 5,
        filter: (f) => {
          const excludedSlugs = new Set(["index", "view", "poem", "game", "study", "music"])
          return !excludedSlugs.has(f.slug!.toLowerCase())
        },
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'AsleepX/Home',
        // from data-repo-id
        repoId: 'R_kgDOM-rMpg',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOM-rMps4Cl2vV',

        themeUrl: "https://github.com/AsleepX/Home/tree/v4/quartz/static/giscus", 
        lightTheme: "light",
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
