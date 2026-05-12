'use client'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import { cn } from './cn'

const markdownComponents: Components = {
  p:    ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-slate-700">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
  em:   ({ children }) => <em className="italic text-indigo-700/90">{children}</em>,
  ul:   ({ children }) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0 marker:text-indigo-400">{children}</ul>
  ),
  ol:   ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0 marker:text-indigo-400">{children}</ol>
  ),
  li:   ({ children }) => <li className="leading-relaxed text-slate-700">{children}</li>,
  h1:   ({ children }) => (
    <h2 className="mb-2 mt-4 first:mt-0 text-base font-semibold text-slate-900">{children}</h2>
  ),
  h2:   ({ children }) => (
    <h3 className="mb-2 mt-3 first:mt-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">
      {children}
    </h3>
  ),
  h3:   ({ children }) => (
    <h4 className="mb-2 mt-3 first:mt-0 text-sm font-medium text-slate-800">{children}</h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-3 border-l-2 border-indigo-300 pl-3 text-slate-500 last:mb-0">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-indigo-600 underline decoration-indigo-400/50 underline-offset-2 hover:text-indigo-800"
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  ),
  hr:  () => <hr className="my-4 border-slate-200" />,
  pre: ({ children }) => (
    <pre className="mb-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-3 text-[13px] leading-relaxed last:mb-0">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className?.includes('language-'))
    if (!isBlock) {
      return (
        <code
          className="rounded-md bg-indigo-50 px-1.5 py-0.5 font-mono text-[0.88em] text-indigo-800"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={cn('font-mono text-slate-800', className)} {...props}>
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className="mb-3 overflow-x-auto rounded-xl border border-slate-200 last:mb-0">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-50 text-slate-600">{children}</thead>,
  th:   ({ children }) => (
    <th className="border-b border-slate-200 px-3 py-2 font-semibold">{children}</th>
  ),
  td:   ({ children }) => (
    <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{children}</td>
  ),
}

interface MarkdownMessageProps {
  content: string
  className?: string
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const trimmed = content.trim()
  if (!trimmed) {
    return (
      <span
        className="inline-block h-4 w-5 animate-pulse rounded bg-slate-200"
        aria-hidden
      />
    )
  }

  return (
    <div className={cn('chat-md text-[15px]', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
