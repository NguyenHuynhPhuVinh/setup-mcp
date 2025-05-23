#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Tạo server instance đơn giản
const server = new McpServer({
  name: "hello",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Đăng ký tool đơn giản chỉ trả về "xin chào"
server.tool("hello", "Trả về lời chào đơn giản", {}, async () => {
  return {
    content: [
      {
        type: "text",
        text: "Xin chào",
      },
    ],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Hello MCP Server đang chạy trên stdio");
}

main().catch((error) => {
  console.error("Lỗi nghiêm trọng trong main():", error);
  process.exit(1);
});
