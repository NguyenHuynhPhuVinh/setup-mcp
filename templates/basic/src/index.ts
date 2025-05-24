#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Tạo server instance
const server = new McpServer({
  name: "{{serverName}}",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Đăng ký tool đơn giản
server.tool(
  "hello",
  "Trả về lời chào đơn giản",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: "Xin chào từ {{serverName}}!",
        },
      ],
    };
  }
);

// Đăng ký tool có tham số
server.tool(
  "greet",
  "Chào một người cụ thể",
  {
    name: z.string().describe("Tên người muốn chào"),
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Xin chào ${name}!`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("{{serverName}} MCP Server đang chạy trên stdio");
}

main().catch((error) => {
  console.error("Lỗi nghiêm trọng trong main():", error);
  process.exit(1);
});
