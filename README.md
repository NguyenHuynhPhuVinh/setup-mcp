# 🚀 setup-mcp

[![NPM Version](https://img.shields.io/npm/v/@tomisakae/setup-mcp.svg)](https://www.npmjs.com/package/@tomisakae/setup-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Công cụ dòng lệnh giúp bạn nhanh chóng thiết lập dự án MCP (Model Context Protocol) mới. `setup-mcp` tạo ra cấu trúc dự án cơ bản cùng các tệp cấu hình cần thiết, giúp bạn sẵn sàng phát triển MCP server của riêng mình.

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng nổi bật](#tính-năng-nổi-bật)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [Tùy chọn dòng lệnh](#tùy-chọn-dòng-lệnh)
- [Templates có sẵn](#templates-có-sẵn)
  - [basic](#basic)
- [Cấu trúc dự án được tạo](#cấu-trúc-dự-án-được-tạo)
- [Sau khi tạo dự án](#sau-khi-tạo-dự-án)
- [Cấu hình với các ứng dụng AI](#cấu-hình-với-các-ứng-dụng-ai)
- [Phát triển](#phát-triển)
- [Đóng góp](#đóng-góp)
- [Giấy phép](#giấy-phép)

## Giới thiệu

`setup-mcp` là một công cụ CLI (Command Line Interface) được thiết kế để đơn giản hóa quá trình khởi tạo một dự án MCP server. Thay vì phải cấu hình mọi thứ từ đầu, bạn có thể sử dụng `setup-mcp` để có ngay một bộ khung dự án sẵn sàng để phát triển.

## Tính năng nổi bật

- **Khởi tạo nhanh chóng:** Tạo dự án MCP mới chỉ với một vài lệnh đơn giản.
- **Hỗ trợ Templates:** Đi kèm với các template dự án được cấu hình sẵn.
- **Tích hợp TypeScript:** Template `basic` sử dụng TypeScript cho trải nghiệm phát triển tốt hơn.
- **Dễ dàng mở rộng:** Cấu trúc dự án rõ ràng, thuận tiện cho việc tùy chỉnh và thêm tính năng.

## Cài đặt

Bạn có thể cài đặt `setup-mcp` toàn cục thông qua npm hoặc sử dụng trực tiếp với npx.

```bash
# Cài đặt toàn cục
npm install -g @tomisakae/setup-mcp

# Hoặc sử dụng trực tiếp với npx (khuyến khích để luôn có phiên bản mới nhất)
npx @tomisakae/setup-mcp my-mcp-project
```

## Sử dụng

Sau khi cài đặt, bạn có thể tạo một dự án MCP mới như sau:

```bash
# Tạo dự án MCP mới trong thư mục "my-mcp-project"
setup-mcp my-mcp-project

# Tạo dự án MCP mới với template cụ thể
setup-mcp my-mcp-project --template basic

# Xem tất cả các tùy chọn
setup-mcp --help
```

Nếu bạn không cung cấp tên dự án, công cụ sẽ hỏi bạn.

## Tùy chọn dòng lệnh

- `[project-name]`: Tên thư mục cho dự án mới của bạn.
- `-t, --template <template>`: Chỉ định template muốn sử dụng (mặc định: `basic`).
- `-h, --help`: Hiển thị thông tin trợ giúp.
- `-V, --version`: Hiển thị phiên bản hiện tại của `setup-mcp`.

## Templates có sẵn

### basic

Template cơ bản cho một MCP server, bao gồm:

- Cấu trúc dự án TypeScript.
- Một công cụ MCP mẫu đơn giản.
- Hướng dẫn cấu hình ban đầu cho các ứng dụng AI như Claude, Cursor và Windsurf (chi tiết trong `README.md` của dự án được tạo).

## Cấu trúc dự án được tạo (với template `basic`)

```plaintext
my-mcp-project/
├── .gitignore
├── README.md           # Tài liệu hướng dẫn cho dự án của BẠN
├── package.json        # Cấu hình dự án và dependencies
├── tsconfig.json       # Cấu hình TypeScript
└── src/
    └── index.ts        # File chính của MCP server, nơi bạn định nghĩa tools
```

## Sau khi tạo dự án

Công cụ `setup-mcp` sẽ tạo một thư mục mới với tên dự án bạn đã cung cấp và tự động cài đặt các dependencies cần thiết.

Sau khi quá trình hoàn tất, hãy làm theo các bước sau:

1.  **Di chuyển vào thư mục dự án:**
    ```bash
    cd my-mcp-project
    ```
2.  **Build dự án (nếu dùng TypeScript):**
    ```bash
    npm run build
    ```
3.  **Khởi động server:**
    ```bash
    npm start
    ```

## Cấu hình với các ứng dụng AI

Sau khi dự án MCP server của bạn được tạo và khởi chạy, bạn cần cấu hình nó với các ứng dụng AI client (ví dụ: Claude, Cursor, Windsurf). Hướng dẫn chi tiết về cách thực hiện việc này sẽ có trong tệp `README.md` bên trong thư mục dự án vừa được tạo.

## Phát triển `setup-mcp` (Công cụ này)

Nếu bạn muốn đóng góp hoặc tùy chỉnh chính công cụ `setup-mcp`:

```bash
# Clone repository (nếu chưa có)
# git clone https://github.com/NguyenHuynhPhuVinh/setup-mcp.git
# cd setup-mcp

# Cài đặt dependencies
npm install

# Build dự án
npm run build

# Chạy trong chế độ phát triển (tự động build lại khi có thay đổi)
npm run dev
```

## Đóng góp

Những đóng góp của bạn luôn được chào đón! Nếu bạn có ý tưởng cải thiện `setup-mcp` hoặc muốn báo lỗi, vui lòng tạo một [Issue](https://github.com/NguyenHuynhPhuVinh/setup-mcp/issues) hoặc gửi một [Pull Request](https://github.com/NguyenHuynhPhuVinh/setup-mcp/pulls).

## Giấy phép

Dự án này được phát hành dưới [Giấy phép MIT](LICENSE).
