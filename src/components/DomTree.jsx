import React, { useState } from "react";

const domTreeData = [
  {
    name: "html",
    children: [
      {
        name: "body",
        children: [
          {
            name: "div#pagina",
            children: [
              {
                name: "div.sezione",
                children: [
                  { name: "h1" },
                  { name: "p" }
                ]
              },
              {
                name: "div.sezione",
                children: [
                  { name: "button" },
                  {
                    name: "ul",
                    children: [
                      { name: "li" },
                      { name: "li" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

function TreeNode({ node, level = 0 }) {
  const hasChildren = node.children && node.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="tree-node">
      <div
        className={`node-content ${hasChildren ? "clickable" : ""}`}
        onClick={() => hasChildren && setIsExpanded((prev) => !prev)}
        style={{ marginLeft: `${level * 18}px` }}
      >
        <span className="toggle-icon">
          {hasChildren ? (isExpanded ? "▼" : "▶") : "•"}
        </span>
        <span className="node-name">{node.name}</span>
      </div>

      {hasChildren && isExpanded && (
        <div className="node-children">
          {node.children.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DomTree() {
  return (
    <div className="tree-container">
      {domTreeData.map((node, index) => (
        <TreeNode key={`${node.name}-${index}`} node={node} />
      ))}
    </div>
  );
}