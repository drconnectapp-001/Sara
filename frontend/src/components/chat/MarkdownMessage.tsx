'use client'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import { cn } from './cn'

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-slate-200">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic text-indigo-200/90">{children}</em>,
  ul: ({ children }) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0 marker:text-indigo-400/80">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0 marker:text-indigo-400/80">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  h1: ({ children }) => (
    <h2 className="mb-2 mt-4 first:mt-0 text-base font-semibold text-white">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="mb-2 mt-3 first:mt-0 text-sm font-semibold uppercase tracking-wide text-indigo-200/90">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mb-2 mt-3 first:mt-0 text-sm font-medium text-slate-200">{children}</h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-3 border-l-2 border-indigo-500/50 pl-3 text-slate-400 last:mb-0">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-indigo-400 underline decoration-indigo-500/40 underline-offset-2 transition-colors hover:text-indigo-300"
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-4 border-white/10" />,
  pre: ({ children }) => (
    <pre className="mb-3 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0a0a12] p-3 text-[13px] leading-relaxed last:mb-0">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className?.includes('language-'))
    if (!isBlock) {
      return (
        <code
          className="rounded-md bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.9em] text-amber-100/95"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={cn('font-mono text-slate-200', className)} {...props}>
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className="mb-3 overflow-x-auto rounded-xl border border-white/[0.08] last:mb-0">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/[0.04] text-slate-300">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-white/[0.08] px-3 py-2 font-medium">{children}</th>
  ),
  td: ({ children }) => <td className="border-b border-white/[0.05] px-3 py-2 text-slate-300">{children}</td>,
}

interface MarkdownMessageProps {
  content: string
  className?: string
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const trimmed = content.trim()
  if (!trimmed) {
    return <span className="inline-block h-4 w-6 animate-pulse rounded bg-white/10" aria-hidden />
  }

  return (
    <div className={cn('chat-md text-[15px]', className)}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
