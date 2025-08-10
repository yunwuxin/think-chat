@echo off
echo 正在安装依赖...
call pnpm install

echo 正在构建项目...
call pnpm run build

echo 构建完成！静态文件已输出到 ../public/static 目录
pause
