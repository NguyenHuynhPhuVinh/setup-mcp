#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

// Lấy đường dẫn hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Phiên bản từ package.json
const version = "1.0.2";

// Khởi tạo chương trình
const program = new Command();

program
  .name("setup-mcp")
  .description(
    "Công cụ thiết lập nhanh chóng dự án MCP (Model Context Protocol)"
  )
  .version(version)
  .option("-t, --template <template>", "Loại template (basic)", "basic")
  .action(async (options: { template: string }) => {
    console.log(chalk.blue("🚀 Thiết lập dự án MCP mới"));

    // Lấy thông tin từ người dùng
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Tên dự án:",
        default: "my-mcp",
      },
      {
        type: "input",
        name: "description",
        message: "Mô tả dự án:",
        default: "Một MCP server đơn giản",
      },
      {
        type: "input",
        name: "author",
        message: "Tác giả:",
        default: "",
      },
      {
        type: "input",
        name: "serverName",
        message: "Tên MCP server:",
        default: (answers: { projectName: string }) => answers.projectName,
      },
    ]);

    // Tạo đường dẫn thư mục dự án mới
    const currentDir = process.cwd();
    const targetDir = path.join(currentDir, answers.projectName);

    // Kiểm tra thư mục dự án
    if (fs.existsSync(targetDir)) {
      const { proceed } = await inquirer.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: `Thư mục '${answers.projectName}' đã tồn tại. Bạn có muốn ghi đè?`,
          default: false,
        },
      ]);

      if (!proceed) {
        console.log(chalk.yellow("⚠️ Hủy thiết lập."));
        process.exit(0);
      }
    }

    // Tạo thư mục dự án nếu chưa tồn tại
    if (!fs.existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
    }

    // Đường dẫn template
    const templateDir = path.resolve(
      __dirname,
      "../templates",
      options.template
    );

    // Kiểm tra template
    if (!fs.existsSync(templateDir)) {
      console.log(
        chalk.red(`❌ Template '${options.template}' không tồn tại.`)
      );
      process.exit(1);
    }

    // Sao chép template
    const spinner = ora("Đang thiết lập dự án...").start();

    try {
      // Sao chép các file từ template
      await fs.copy(templateDir, targetDir, { 
        overwrite: true,
        // Đảm bảo các file ẩn như .gitignore cũng được sao chép
        filter: (src) => {
          const filename = path.basename(src);
          // Trả về true cho tất cả các file, bao gồm cả các file bắt đầu bằng dấu chấm
          return true;
        }
      });

      // Đọc và cập nhật các file
      const files = ["package.json", "README.md", "src/index.ts"];

      for (const file of files) {
        const filePath = path.join(targetDir, file);

        if (fs.existsSync(filePath)) {
          // Đọc nội dung file
          let content = await fs.readFile(filePath, "utf8");

          // Thay thế các placeholder
          content = content.replace(
            /\{\{projectName\}\}/g,
            answers.projectName
          );
          content = content.replace(
            /\{\{description\}\}/g,
            answers.description
          );
          content = content.replace(/\{\{author\}\}/g, answers.author);
          content = content.replace(/\{\{serverName\}\}/g, answers.serverName);

          // Ghi lại nội dung đã cập nhật
          await fs.writeFile(filePath, content, "utf8");
        }
      }

      spinner.succeed("Dự án đã được thiết lập thành công!");

      // Cài đặt dependencies
      console.log(chalk.blue("\n💾 Đang cài đặt dependencies..."));

      // Chuyển đến thư mục dự án
      process.chdir(targetDir);

      try {
        // Sử dụng promisify để chuyển exec thành promise
        const execPromise = promisify(exec);

        // Chạy npm install
        const npmSpinner = ora("npm install đang chạy...").start();
        await execPromise("npm install");
        npmSpinner.succeed("npm install hoàn tất!");

        // Hướng dẫn tiếp theo
        console.log(
          chalk.green("\n✅ Dự án MCP đã được tạo và cài đặt thành công!")
        );
        console.log(chalk.white("\nCác bước tiếp theo:"));
        console.log(chalk.white(`  1. cd ${answers.projectName}`));
        console.log(chalk.white("  2. npm run build"));
        console.log(chalk.white("  3. npm run dev"));

        console.log(
          chalk.blue(
            "\nĐể cấu hình với Claude, hãy xem hướng dẫn trong README.md"
          )
        );
      } catch (npmError: unknown) {
        console.error(
          chalk.yellow(
            `\n⚠️ Có lỗi khi cài đặt dependencies: ${
              (npmError as Error).message
            }`
          )
        );
        console.log(chalk.white("\nBạn có thể cài đặt thủ công bằng cách:"));
        console.log(chalk.white(`  1. cd ${answers.projectName}`));
        console.log(chalk.white("  2. npm install"));
        console.log(chalk.white("  3. npm run build"));
        console.log(chalk.white("  4. npm start"));
      }
    } catch (error: unknown) {
      spinner.fail("Có lỗi xảy ra khi thiết lập dự án.");
      console.error(chalk.red(`❌ Lỗi: ${(error as Error).message}`));
      process.exit(1);
    }
  });

// Xử lý lệnh không xác định
program.on("command:*", () => {
  console.error(chalk.red(`❌ Lệnh không hợp lệ: ${program.args.join(" ")}`));
  console.log(
    chalk.white(
      `Chạy ${chalk.cyan("setup-mcp --help")} để xem các lệnh có sẵn.`
    )
  );
  process.exit(1);
});

// Phân tích đối số dòng lệnh
program.parse(process.argv);
