---
name: subframe-docs
description: Look up Subframe documentation for product orientation, setup, CLI and MCP usage, and troubleshooting.
---

Subframe is a tool to design UI for your codebase. Use its canvas to create and edit pages, components, and themes, then bring designs into your app. Design and chat on the web; use the [desktop app](https://docs.subframe.com/desktop-app) for local codebase connections.

Use `search_subframe_docs` to answer documentation questions. Use `query_docs_filesystem_subframe_docs` to read exact pages. Cite the relevant documentation page links in answers. Look up setup and troubleshooting instructions for the user's host and framework before recommending commands.

For design, editing, implementation, or imports, connect to the Subframe MCP server at `https://mcp.subframe.com/mcp` and read its guidance before starting:

- `get_design_guidance`: create or edit designs. Use its `import` topic to bring an existing codebase's or website's design system into Subframe.
- `get_implementation_guidance`: implement designs in an application or set up Subframe components.

The docs MCP provides documentation access. Use the Subframe MCP for project access and workflow guidance.

Follow the [MCP installation guide](https://docs.subframe.com/agent/mcp-server#installing-the-mcp-server):

- **Claude and ChatGPT:** add Subframe from their directory listings ([Claude directory](https://claude.ai/directory/subframe), [ChatGPT listing](https://chatgpt.com/plugins/plugin_asdk_app_6ae8397e42e48191b87c62b97f0c613d)).
- **Claude Code:** run `claude mcp add --transport http subframe https://mcp.subframe.com/mcp`, then `/mcp` to sign in. Connectors added on claude.ai also load in Claude Code.
- **Codex:** run `codex plugin marketplace add SubframeApp/subframe`, then `codex plugin add subframe@subframe`, then `/mcp login subframe` in a new session.
- **Cursor:** follow the guide's MCP setup steps.
