import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Type,
  Quote as QuoteIcon,
  ExternalLink,
  Plus,
  FileText
} from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface Citation {
  id: string
  title: string
  url: string
  author?: string
  date?: string
}

interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  citations?: Citation[]
  onCitationAdd?: (citation: Citation) => void
}

export const RichTextEditor = ({ 
  content = '', 
  onChange, 
  citations = [],
  onCitationAdd 
}: RichTextEditorProps) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showCitationDialog, setShowCitationDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [newCitation, setNewCitation] = useState({
    title: '',
    url: '',
    author: '',
    date: ''
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer hover:text-primary/80',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4 text-foreground',
      },
    },
  })

  const addLink = () => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setShowLinkDialog(false)
    }
  }

  const addCitation = () => {
    if (newCitation.title && newCitation.url && onCitationAdd) {
      const citation: Citation = {
        id: Date.now().toString(),
        ...newCitation
      }
      onCitationAdd(citation)
      
      // Insert citation in text
      const citationNumber = citations.length + 1
      editor?.chain().focus().insertContent(`<sup class="text-primary cursor-pointer">[${citationNumber}]</sup>`).run()
      
      setNewCitation({ title: '', url: '', author: '', date: '' })
      setShowCitationDialog(false)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border border-input rounded-lg bg-background">
      {/* Toolbar */}
      <div className="border-b border-input p-3">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive('bold') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('italic') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('strike') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Headings */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="text-xs"
            >
              H1
            </Button>
            <Button
              variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className="text-xs"
            >
              H2
            </Button>
            <Button
              variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className="text-xs"
            >
              H3
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Alignment */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Highlight */}
          <Button
            variant={editor.isActive('highlight') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Highlighter className="w-4 h-4" />
          </Button>

          {/* Link */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLinkDialog(true)}
          >
            <LinkIcon className="w-4 h-4" />
          </Button>

          {/* Citation */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCitationDialog(true)}
          >
            <QuoteIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Link Dialog */}
        {showLinkDialog && (
          <div className="flex items-center gap-2 mt-3 p-3 bg-muted rounded-lg">
            <Input
              placeholder="Enter URL..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" onClick={addLink}>
              Add Link
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
          </div>
        )}

        {/* Citation Dialog */}
        {showCitationDialog && (
          <div className="mt-3 p-4 bg-muted rounded-lg space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <Input
                placeholder="Source title..."
                value={newCitation.title}
                onChange={(e) => setNewCitation(prev => ({ ...prev, title: e.target.value }))}
              />
              <Input
                placeholder="URL..."
                value={newCitation.url}
                onChange={(e) => setNewCitation(prev => ({ ...prev, url: e.target.value }))}
              />
              <Input
                placeholder="Author (optional)..."
                value={newCitation.author}
                onChange={(e) => setNewCitation(prev => ({ ...prev, author: e.target.value }))}
              />
              <Input
                placeholder="Date (optional)..."
                value={newCitation.date}
                onChange={(e) => setNewCitation(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={addCitation}>
                <Plus className="w-4 h-4 mr-1" />
                Add Citation
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowCitationDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Citations List */}
      {citations.length > 0 && (
        <div className="border-t border-input p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Citations</h4>
          </div>
          <div className="space-y-2">
            {citations.map((citation, index) => (
              <Card key={citation.id} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{citation.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <a 
                          href={citation.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Source
                        </a>
                        {citation.author && (
                          <span className="text-xs text-muted-foreground">
                            by {citation.author}
                          </span>
                        )}
                        {citation.date && (
                          <span className="text-xs text-muted-foreground">
                            {citation.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}