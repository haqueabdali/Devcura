import type { ReactNode } from "react";

/**
 * Deliberately tiny markdown renderer for article bodies.
 * Supports: ## / ### headings, "- " bullet lists, **bold**, paragraphs.
 * Content is never rendered with dangerouslySetInnerHTML, so stored article
 * bodies cannot inject markup.
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**") && chunk.length > 4) {
      return <strong key={`${keyPrefix}-b-${index}`}>{chunk.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-t-${index}`}>{chunk}</span>;
  });
}

export function renderMarkdown(body: string): ReactNode[] {
  const blocks = body.split(/\n{2,}/);
  const nodes: ReactNode[] = [];

  blocks.forEach((rawBlock, blockIndex) => {
    const block = rawBlock.trim();
    if (!block) return;

    if (block.startsWith("### ")) {
      nodes.push(<h3 key={`h3-${blockIndex}`}>{block.slice(4)}</h3>);
      return;
    }
    if (block.startsWith("## ")) {
      nodes.push(<h2 key={`h2-${blockIndex}`}>{block.slice(3)}</h2>);
      return;
    }
    if (block.startsWith("- ")) {
      const items = block
        .split("\n")
        .map((line) => line.replace(/^-\s+/, "").trim())
        .filter(Boolean);
      nodes.push(
        <ul key={`ul-${blockIndex}`}>
          {items.map((item, i) => (
            <li key={`li-${blockIndex}-${i}`}>{renderInline(item, `li-${blockIndex}-${i}`)}</li>
          ))}
        </ul>,
      );
      return;
    }
    nodes.push(<p key={`p-${blockIndex}`}>{renderInline(block, `p-${blockIndex}`)}</p>);
  });

  return nodes;
}

/** Extracts "## " headings for an article table of contents. */
export function extractHeadings(body: string) {
  return body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim());
}
