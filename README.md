# setup-mcp

## Giới thiệu

Setup-MCP là công cụ dòng lệnh giúp bạn nhanh chóng thiết lập dự án MCP (Model Context Protocol) mới. Công cụ này tạo ra cấu trúc dự án cơ bản với các file cấu hình cần thiết để bạn có thể bắt đầu phát triển MCP server của riêng mình.

## Cài đặt

```bash
# Cài đặt toàn cục
npm install -g @tomisakae/setup-mcp

# Hoặc sử dụng trực tiếp với npx
npx @tomisakae/setup-mcp
```

## Sử dụng

```bash
# Tạo dự án MCP mới
setup-mcp

# Tạo dự án MCP mới với template cụ thể
setup-mcp --template basic

# Xem trợ giúp
setup-mcp --help
```

## Tùy chọn

- `-t, --template <template>`: Loại template (mặc định: basic)
- `-h, --help`: Hiển thị trợ giúp
- `-V, --version`: Hiển thị phiên bản

## Các template có sẵn

### basic

Template cơ bản cho MCP server với:

- Cấu trúc dự án TypeScript
- Công cụ MCP đơn giản
- Hướng dẫn cấu hình cho Claude, Cursor và Windsurf

## Cấu trúc dự án được tạo

```
├── README.md           # Tài liệu hướng dẫn
├── package.json        # Cấu hình dự án
├── tsconfig.json       # Cấu hình TypeScript
└── src/
    └── index.ts        # File chính của MCP server
```

## Sau khi tạo dự án

Công cụ sẽ tạo một thư mục mới với tên dự án bạn đã nhập, sau đó tự động cài đặt các dependencies cần thiết. Sau khi hoàn tất, bạn chỉ cần:

1. Di chuyển vào thư mục dự án: `cd <tên-dự-án>`
2. Build dự án: `npm run build`
3. Khởi động server: `npm start`

## Cấu hình với các ứng dụng AI

Sau khi tạo dự án, bạn có thể cấu hình MCP server của mình với các ứng dụng AI như Claude, Cursor hoặc Windsurf. Hướng dẫn chi tiết được cung cấp trong file README.md của dự án được tạo.

## Phát triển

```bash
# Cài đặt dependencies
npm install

# Build dự án
npm run build

# Chạy trong chế độ phát triển
npm run dev
```

## Giấy phép

Dự án này được phát hành dưới giấy phép MIT.
