"use client";

import { useState } from "react";
import { InlineHelp } from "@/components/ui/inline-help";

const sqlHelp = [
  { title: "功能说明", items: ["格式化和美化 SQL 语句", "支持 SQL 关键字大写"] },
  { title: "使用方法", items: ["粘贴 SQL 语句", "点击「格式化」", "复制格式化后的 SQL"] },
];

function prettifySQL(sql: string, uppercaseKeywords = true): string {
  const keywords = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER",
    "ON", "GROUP", "BY", "ORDER", "ASC", "DESC", "HAVING", "LIMIT", "OFFSET",
    "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE",
    "ALTER", "DROP", "INDEX", "AS", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX",
    "BETWEEN", "IN", "LIKE", "IS", "NULL", "NOT", "EXISTS", "CASE", "WHEN", "THEN",
    "ELSE", "END", "UNION", "ALL", "INTERSECT", "EXCEPT", "CROSS", "NATURAL",
    "WITH", "RECURSIVE", "OVER", "PARTITION", "ROW_NUMBER", "RANK", "DENSE_RANK",
    "FETCH", "NEXT", "ROWS", "ONLY", "FIRST", "LAST", "TOP", "PERCENT", "TIES",
  ];

  let result = sql.trim();

  result = result.replace(/\s+/g, " ");

  if (uppercaseKeywords) {
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      result = result.replace(regex, keyword);
    }
  }

  const clauseKeywords = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN",
    "INNER JOIN", "OUTER JOIN", "CROSS JOIN", "NATURAL JOIN",
    "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET",
    "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM",
    "CREATE TABLE", "ALTER TABLE", "DROP TABLE",
    "UNION", "INTERSECT", "EXCEPT", "WITH",
    "FETCH NEXT", "ROWS ONLY",
  ];

  for (const keyword of clauseKeywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    result = result.replace(regex, `\n${keyword}`);
  }

  result = result.trim();
  const lines = result.split("\n");
  const formatted = lines.map((line) => line.trim()).filter((line) => line.length > 0);
  result = formatted.join("\n");

  return result;
}

export function SQLPrettify() {
  const [input, setInput] = useState("select id, name, email from users where age > 18 and status = 'active' order by name asc limit 10");
  const [output, setOutput] = useState("");
  const [uppercase, setUppercase] = useState(true);

  const format = () => {
    setOutput(prettifySQL(input, uppercase));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">SQL 格式化工具</h2>
          <InlineHelp content={sqlHelp} />
        </div>
        <p className="text-sm text-muted-foreground">
          格式化和美化 SQL 语句
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">输入 SQL</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-apple mt-1 font-mono"
          rows={8}
          placeholder="SELECT * FROM table WHERE condition"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={uppercase}
          onChange={(e) => setUppercase(e.target.checked)}
          className="rounded"
        />
        <label className="text-sm">关键字大写</label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={format}
          disabled={!input}
          className="btn-apple bg-primary text-primary-foreground disabled:opacity-50"
        >
          格式化
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="btn-apple btn-secondary disabled:opacity-50"
        >
          复制
        </button>
      </div>

      {output && (
        <div className="p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">格式化结果</h3>
          </div>
          <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
