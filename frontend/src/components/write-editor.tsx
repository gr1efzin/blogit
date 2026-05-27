import { useEffect, useRef, useState } from 'react'
import { Save, Eye, EyeOff } from 'lucide-react'

export function WriteEditor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(false)
  const titleRef = useRef<HTMLTextAreaElement | null>(null)

  const resizeTitle = () => {
    if (!titleRef.current) return
    titleRef.current.style.height = '0px'
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
  }

  useEffect(() => {
    resizeTitle()
  }, [title])

  const handlePublish = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background text-foreground font-mono">
      <header className="border-b border-border/60 bg-background px-8 py-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition"
            >
              {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition"
            >
              <Save className="h-4 w-4" />
              {saved ? 'Published!' : 'Publish'}
            </button>
          </div>
        </div>
      </header>
      {preview ? (
        // Preview View
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="mx-auto w-full max-w-3xl px-8 pb-24 pt-10">
            <h1 className="mb-6 break-words text-4xl font-black leading-tight tracking-tight text-foreground">
              {title || 'Your Story Title'}
            </h1>
            <div className="whitespace-pre-wrap break-words text-base leading-7 text-foreground/80">
              {content || 'Your story content will appear here...'}
            </div>
          </div>
        </div>
      ) : (
        // Edit View
        <>
          {/* Title Input */}
          <div className="border-b border-border/60 bg-background px-8 py-8">
            <textarea
              ref={titleRef}
              rows={1}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                resizeTitle()
              }}
              placeholder="Story Title"
              className="w-full resize-none overflow-hidden bg-transparent text-4xl font-black tracking-tight leading-tight outline-none placeholder:text-foreground/30 text-foreground"
            />
            <p className="mt-2 text-xs text-foreground/40">Press Tab to move to content</p>
          </div>

          {/* Content Editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
            className="min-h-0 flex-1 resize-none bg-transparent px-8 pb-24 pt-8 text-base leading-7 text-foreground outline-none placeholder:text-foreground/30"
          />
        </>
      )}

      {/* Footer Stats */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 flex justify-between border-t border-border/60 bg-background px-8 py-4 text-xs text-foreground/50">
        <div>Words: {content.split(/\s+/).filter(w => w.length > 0).length}</div>
        <div>Characters: {content.length}</div>
      </footer>
    </div>
  )
}
