---
name: subframe-docs
description: Look up Subframe documentation for product orientation, setup, CLI and MCP usage, and troubleshooting.
---

Subframe is a tool to design UI for your codebase. Use its canvas to create and edit pages, components, and themes, then bring designs into your app. Design and chat on the web; use the [desktop app](https://docs.subframe.com/desktop-app) for local codebase connections.

Use `search_subframe_docs` to answer documentation questions. Use `query_docs_filesystem_subframe_docs` to read exact pages. Cite the relevant documentation page links in answers. Look up setup and troubleshooting instructions for the user's host and framework before recommending commands.

For design, editing, implementation, or imports, connect to the Subframe MCP server at `https://mcp.subframe.com/mcp` and use the Subframe plugin's skills:

- `design`: create or edit designs in Subframe.
- `develop`: implement designs in an application or set up Subframe components.
- `import`: bring an existing codebase's or website's design system into Subframe.

The docs MCP provides documentation access. Use the Subframe MCP for project access and the plugin skills for those workflows.

Follow the [MCP and skills installation guide](https://docs.subframe.com/agent/mcp-server#installing-the-mcp-server-and-agent-skills) for authentication and verification:

- **Claude Code:** add the marketplace with `claude plugin marketplace add https://github.com/SubframeApp/subframe`, then run `claude plugin install subframe@subframe`.
- **Codex:** run `codex plugin marketplace add SubframeApp/subframe`, then `codex plugin add subframe@subframe`, then sign in with `/mcp login subframe` in a new Codex session.
- **Cursor:** follow the guide's MCP setup steps, then install skills with `npx skills add https://github.com/SubframeApp/subframe --skill '*' -g --agent cursor --yes`. Cursor also loads a Subframe plugin installed in Claude Code when its third-party plugins setting is on.

Keep these boundaries when explaining the [design-to-code workflow](https://docs.subframe.com/develop/concepts/design-to-code):

- Use the CLI for components and theme files: `sync` brings components into code; `init` sets up or refreshes theme files.
- Implement pages from `get_page_info`; CLI sync does not update pages.
- Sync missing components by name, for example `npx @subframe/cli@latest sync Button Alert`. Avoid routine `sync --all` or bare `sync`. Refresh existing components only for a requested design update.
- Determine whether Subframe or the codebase owns the theme and components. Follow that source of truth. When the codebase owns them, use its existing components and tokens; initialize or sync Subframe only when the user chooses to adopt it.
