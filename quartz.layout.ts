import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/sailcom/Owners-Handbook",
      "搏浪号": "https://imsail.com",
      "联系邮箱：baodian#seek.li（#替换为@）": "",
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
    Component.Explorer({
  	  useSavedState: false,
  		sortFn: (a, b) => {
  		  const wA = Number(a.data?.weight ?? 9999)
  		  const wB = Number(b.data?.weight ?? 9999)
  		  if (wA !== wB) return wA - wB
  		  return a.displayName.localeCompare(b.displayName, "zh-CN")
  		},
  	  order: ["sort", "filter", "map"],
	}),
  ],
  right: [
    // Component.Graph(),
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
    Component.Explorer({
  	  useSavedState: false,
  		sortFn: (a, b) => {
  		  const wA = Number(a.data?.weight ?? 9999)
  		  const wB = Number(b.data?.weight ?? 9999)
  		  if (wA !== wB) return wA - wB
  		  return a.displayName.localeCompare(b.displayName, "zh-CN")
  		},
  	  order: ["sort", "filter", "map"],
	}),
  ],
  right: [],
}
