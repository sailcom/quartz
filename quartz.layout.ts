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
      "联系邮箱：baodian＠seek.li": "mailto:baodian@seek.li",
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
		  const wA = a.data?.weight
		  const wB = b.data?.weight
		
		  if (wA != null && wB != null) return Number(wA) - Number(wB)
		  if (wA != null) return -1
		  if (wB != null) return 1
		
		  const dA = a.data?.date ? new Date(a.data.date).getTime() : null
		  const dB = b.data?.date ? new Date(b.data.date).getTime() : null
		  if (dA != null && dB != null) return dB - dA
		  if (dA != null) return -1
		  if (dB != null) return 1
		
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
		  const wA = a.data?.weight
		  const wB = b.data?.weight
		
		  if (wA != null && wB != null) return Number(wA) - Number(wB)
		  if (wA != null) return -1
		  if (wB != null) return 1
		
		  const dA = a.data?.date ? new Date(a.data.date).getTime() : null
		  const dB = b.data?.date ? new Date(b.data.date).getTime() : null
		  if (dA != null && dB != null) return dB - dA
		  if (dA != null) return -1
		  if (dB != null) return 1
		
		  return a.displayName.localeCompare(b.displayName, "zh-CN")
		},
  	  order: ["sort", "filter", "map"],
	}),
  ],
  right: [],
}
