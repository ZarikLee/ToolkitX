"use client";

import { useState } from "react";

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue: string;
  comment: string;
  isPrimary: boolean;
}

const dataTypes = [
  "INT",
  "BIGINT",
  "TINYINT",
  "SMALLINT",
  "DECIMAL",
  "FLOAT",
  "DOUBLE",
  "VARCHAR",
  "TEXT",
  "MEDIUMTEXT",
  "LONGTEXT",
  "DATE",
  "DATETIME",
  "TIMESTAMP",
  "BOOLEAN",
  "JSON",
  "BLOB",
  "ENUM",
];

export function SqlGenerator() {
  const [tableName, setTableName] = useState("");
  const [tableComment, setTableComment] = useState("");
  const [columns, setColumns] = useState<Column[]>([
    { name: "id", type: "BIGINT", nullable: false, defaultValue: "", comment: "主键", isPrimary: true },
    { name: "created_at", type: "DATETIME", nullable: false, defaultValue: "CURRENT_TIMESTAMP", comment: "创建时间", isPrimary: false },
    { name: "updated_at", type: "DATETIME", nullable: false, defaultValue: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", comment: "更新时间", isPrimary: false },
  ]);
  const [generated, setGenerated] = useState("");

  const addColumn = () => {
    setColumns([
      ...columns,
      { name: "", type: "VARCHAR", nullable: true, defaultValue: "", comment: "", isPrimary: false },
    ]);
  };

  const updateColumn = (index: number, field: keyof Column, value: any) => {
    const updated = [...columns];
    updated[index] = { ...updated[index], [field]: value };
    setColumns(updated);
  };

  const removeColumn = (index: number) => {
    if (columns.length <= 1) return;
    setColumns(columns.filter((_, i) => i !== index));
  };

  const generateSql = () => {
    if (!tableName) return;

    const columnDefs = columns
      .map((col) => {
        let def = `  \`${col.name}\` ${col.type}`;
        if (!col.nullable) def += " NOT NULL";
        if (col.defaultValue) def += ` DEFAULT ${col.defaultValue}`;
        if (col.comment) def += ` COMMENT '${col.comment}'`;
        return def;
      })
      .join(",\n");

    const primaryKeys = columns
      .filter((c) => c.isPrimary)
      .map((c) => `\`${c.name}\``)
      .join(", ");

    let sql = `CREATE TABLE \`${tableName}\` (\n${columnDefs}`;

    if (primaryKeys) {
      sql += `,\n  PRIMARY KEY (${primaryKeys})`;
    }

    sql += `\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

    if (tableComment) {
      sql += ` COMMENT='${tableComment}'`;
    }

    sql += ";";

    setGenerated(sql);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">SQL 建表语句生成器</h2>
        <p className="text-sm text-muted-foreground">
          可视化设计表结构，生成 MySQL 建表 SQL
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">表名 *</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded text-sm"
            placeholder="users"
          />
        </div>
        <div>
          <label className="text-sm font-medium">表注释</label>
          <input
            type="text"
            value={tableComment}
            onChange={(e) => setTableComment(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded text-sm"
            placeholder="用户表"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">字段定义</h3>
          <button
            onClick={addColumn}
            className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
          >
            + 添加字段
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">字段名</th>
                <th className="p-2 text-left">类型</th>
                <th className="p-2 text-center">NOT NULL</th>
                <th className="p-2 text-center">主键</th>
                <th className="p-2 text-left">默认值</th>
                <th className="p-2 text-left">注释</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => updateColumn(index, "name", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="column_name"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      value={col.type}
                      onChange={(e) => updateColumn(index, "type", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      {dataTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={!col.nullable}
                      onChange={(e) => updateColumn(index, "nullable", !e.target.checked)}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={col.isPrimary}
                      onChange={(e) => updateColumn(index, "isPrimary", e.target.checked)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={col.defaultValue}
                      onChange={(e) => updateColumn(index, "defaultValue", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="NULL"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={col.comment}
                      onChange={(e) => updateColumn(index, "comment", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="字段说明"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => removeColumn(index)}
                      className="text-destructive hover:underline text-sm"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={generateSql}
        disabled={!tableName}
        className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium disabled:opacity-50"
      >
        生成 SQL
      </button>

      {generated && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">生成的 SQL</h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
            >
              复制
            </button>
          </div>
          <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
            {generated}
          </pre>
        </div>
      )}
    </div>
  );
}
