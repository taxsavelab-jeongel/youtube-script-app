'use client'
// Design Ref: §3.2 ScriptResult — 타이핑 커서 애니메이션

interface StreamingTextProps {
  text: string
  isStreaming: boolean
  className?: string
}

export default function StreamingText({
  text,
  isStreaming,
  className = '',
}: StreamingTextProps) {
  return (
    <span className={className}>
      {text}
      {isStreaming && (
        <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  )
}
