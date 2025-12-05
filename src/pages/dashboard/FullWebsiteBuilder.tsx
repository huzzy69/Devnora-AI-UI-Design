import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Paintbrush, Plus, Eye, Save, Undo, Redo, Smartphone, Monitor, Tablet,
  Settings, Layers, Type, Image as ImageIcon, Video, Layout, Grid,
  Square, MousePointer, Trash2, Copy, ChevronDown, ChevronRight, Zap,
  Code, Download, Upload, Palette, AlignLeft, AlignCenter, AlignRight,
  Moon, Sun, Globe, Play
} from 'lucide-react';

interface Block {
  id: string;
  type: string;
  content: any;
  styles: any;
  children?: Block[];
}

interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  preview: string;
}

const themes: Theme[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    preview: 'from-blue-500 to-purple-500'
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    primaryColor: '#6366F1',
    secondaryColor: '#EC4899',
    backgroundColor: '#111827',
    textColor: '#F9FAFB',
    preview: 'from-indigo-600 to-pink-600'
  },
  {
    id: 'nature-green',
    name: 'Nature Green',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    backgroundColor: '#F0FDF4',
    textColor: '#064E3B',
    preview: 'from-green-500 to-emerald-600'
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    primaryColor: '#F59E0B',
    secondaryColor: '#EF4444',
    backgroundColor: '#FFFBEB',
    textColor: '#78350F',
    preview: 'from-amber-500 to-red-500'
  }
];

const componentLibrary = [
  {
    category: 'Layout',
    icon: Layout,
    items: [
      { type: 'container', label: 'Container', icon: Square },
      { type: 'section', label: 'Section', icon: Layout },
      { type: 'grid', label: 'Grid', icon: Grid },
      { type: 'columns', label: 'Columns', icon: Layers }
    ]
  },
  {
    category: 'Content',
    icon: Type,
    items: [
      { type: 'heading', label: 'Heading', icon: Type },
      { type: 'paragraph', label: 'Paragraph', icon: AlignLeft },
      { type: 'image', label: 'Image', icon: ImageIcon },
      { type: 'video', label: 'Video', icon: Video }
    ]
  },
  {
    category: 'Interactive',
    icon: MousePointer,
    items: [
      { type: 'button', label: 'Button', icon: MousePointer },
      { type: 'form', label: 'Form', icon: Square },
      { type: 'input', label: 'Input', icon: Type },
      { type: 'navbar', label: 'Navigation', icon: Layout }
    ]
  }
];

function DraggableComponent({ type, label, icon: Icon }: any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-move transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="w-4 h-4 text-blue-400" />
      <span className="text-sm text-slate-300">{label}</span>
    </div>
  );
}

function DroppableCanvas({ blocks, onDrop, onSelectBlock, selectedBlock }: any) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: any) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const renderBlock = (block: Block) => {
    const isSelected = selectedBlock?.id === block.id;

    switch (block.type) {
      case 'heading':
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block)}
            className={`p-4 cursor-pointer transition-all ${
              isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : 'hover:ring-1 hover:ring-slate-600'
            }`}
            style={block.styles}
          >
            <h2 className="text-3xl">{block.content.text || 'Heading Text'}</h2>
          </div>
        );
      case 'paragraph':
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block)}
            className={`p-4 cursor-pointer transition-all ${
              isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : 'hover:ring-1 hover:ring-slate-600'
            }`}
            style={block.styles}
          >
            <p className="text-slate-300">{block.content.text || 'Paragraph text goes here. Click to edit.'}</p>
          </div>
        );
      case 'button':
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block)}
            className={`p-4 cursor-pointer transition-all ${
              isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : 'hover:ring-1 hover:ring-slate-600'
            }`}
          >
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
              style={block.styles}
            >
              {block.content.text || 'Button Text'}
            </button>
          </div>
        );
      case 'image':
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block)}
            className={`p-4 cursor-pointer transition-all ${
              isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : 'hover:ring-1 hover:ring-slate-600'
            }`}
          >
            <div className="w-full h-64 bg-slate-800 rounded-lg flex items-center justify-center" style={block.styles}>
              <ImageIcon className="w-16 h-16 text-slate-600" />
            </div>
          </div>
        );
      case 'container':
      case 'section':
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block)}
            className={`p-6 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer transition-all ${
              isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : 'hover:border-slate-600'
            }`}
            style={block.styles}
          >
            <div className="text-sm text-slate-500 mb-2">{block.type.toUpperCase()}</div>
            {block.children && block.children.length > 0 ? (
              block.children.map(renderBlock)
            ) : (
              <div className="text-slate-600">Drop components here</div>
            )}
          </div>
        );
      default:
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block)}
            className={`p-4 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer ${
              isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
            style={block.styles}
          >
            {block.type}
          </div>
        );
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 bg-slate-950 rounded-xl p-8 overflow-auto transition-all ${
        isOver ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {blocks.length === 0 ? (
        <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl">
          <div className="text-center">
            <Layers className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl text-slate-400 mb-2">Start Building Your Website</h3>
            <p className="text-slate-600">Drag components from the left panel to get started</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">{blocks.map(renderBlock)}</div>
      )}
    </div>
  );
}

export default function FullWebsiteBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(false);
  const [leftPanelTab, setLeftPanelTab] = useState<'components' | 'layers'>('components');
  const [rightPanelTab, setRightPanelTab] = useState<'properties' | 'theme'>('properties');
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const handleDrop = (item: any) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type: item.type,
      content: {
        text: `New ${item.label}`
      },
      styles: {}
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleSelectBlock = (block: Block) => {
    setSelectedBlock(block);
    setRightPanelTab('properties');
  };

  const handleUpdateBlockContent = (key: string, value: any) => {
    if (!selectedBlock) return;

    setBlocks(blocks.map(block =>
      block.id === selectedBlock.id
        ? { ...block, content: { ...block.content, [key]: value } }
        : block
    ));

    setSelectedBlock({
      ...selectedBlock,
      content: { ...selectedBlock.content, [key]: value }
    });
  };

  const handleUpdateBlockStyle = (key: string, value: any) => {
    if (!selectedBlock) return;

    setBlocks(blocks.map(block =>
      block.id === selectedBlock.id
        ? { ...block, styles: { ...block.styles, [key]: value } }
        : block
    ));

    setSelectedBlock({
      ...selectedBlock,
      styles: { ...selectedBlock.styles, [key]: value }
    });
  };

  const handleDeleteBlock = () => {
    if (!selectedBlock) return;
    setBlocks(blocks.filter(block => block.id !== selectedBlock.id));
    setSelectedBlock(null);
  };

  const handleDuplicateBlock = () => {
    if (!selectedBlock) return;
    const newBlock = {
      ...selectedBlock,
      id: `block-${Date.now()}`
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleSave = () => {
    console.log('Saving website...', blocks);
    alert('Website saved successfully!');
  };

  const handleExport = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: ${selectedTheme.backgroundColor};
      color: ${selectedTheme.textColor};
    }
  </style>
</head>
<body>
  ${blocks.map(block => `<div>${block.content.text || ''}</div>`).join('\n  ')}
</body>
</html>
    `;
  };

  const viewModeWidth = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 bg-slate-950 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Paintbrush className="w-5 h-5 text-blue-400" />
              <h1 className="text-lg text-white">Website Builder</h1>
            </div>
            <div className="h-6 w-px bg-slate-700"></div>
            <input
              type="text"
              placeholder="Untitled Website"
              className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Undo/Redo */}
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="Undo">
                <Undo className="w-4 h-4 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="Redo">
                <Redo className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="h-6 w-px bg-slate-700"></div>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <div className="h-6 w-px bg-slate-700"></div>

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                <div className={`w-4 h-4 rounded bg-gradient-to-r ${selectedTheme.preview}`}></div>
                <span className="text-sm text-white">{selectedTheme.name}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showThemeSelector && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="p-3 border-b border-slate-700">
                    <h3 className="text-sm text-white">Select Theme</h3>
                  </div>
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setSelectedTheme(theme);
                          setShowThemeSelector(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg transition-colors ${
                          selectedTheme.id === theme.id ? 'bg-slate-700' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded bg-gradient-to-br ${theme.preview}`}></div>
                        <div className="flex-1 text-left">
                          <div className="text-sm text-white">{theme.name}</div>
                          <div className="text-xs text-slate-400">Click to apply</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-700"></div>

            {/* Actions */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Components & Layers */}
          <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setLeftPanelTab('components')}
                className={`flex-1 px-4 py-3 text-sm transition-colors ${
                  leftPanelTab === 'components'
                    ? 'text-white bg-slate-800 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Components
              </button>
              <button
                onClick={() => setLeftPanelTab('layers')}
                className={`flex-1 px-4 py-3 text-sm transition-colors ${
                  leftPanelTab === 'layers'
                    ? 'text-white bg-slate-800 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Layers
              </button>
            </div>

            {/* Components Tab */}
            {leftPanelTab === 'components' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {componentLibrary.map((category, i) => (
                  <div key={i}>
                    <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.map((item, j) => (
                        <DraggableComponent key={j} {...item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Layers Tab */}
            {leftPanelTab === 'layers' && (
              <div className="flex-1 overflow-y-auto p-4">
                {blocks.length === 0 ? (
                  <div className="text-center py-8">
                    <Layers className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">No layers yet</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {blocks.map((block) => (
                      <div
                        key={block.id}
                        onClick={() => handleSelectBlock(block)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          selectedBlock?.id === block.id
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                        <span className="text-sm flex-1">{block.type}</span>
                        <Eye className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            <div className="flex-1 overflow-auto p-6">
              <div className={`mx-auto transition-all ${viewModeWidth[viewMode]}`}>
                <DroppableCanvas
                  blocks={blocks}
                  onDrop={handleDrop}
                  onSelectBlock={handleSelectBlock}
                  selectedBlock={selectedBlock}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Properties & Theme */}
          <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setRightPanelTab('properties')}
                className={`flex-1 px-4 py-3 text-sm transition-colors ${
                  rightPanelTab === 'properties'
                    ? 'text-white bg-slate-800 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setRightPanelTab('theme')}
                className={`flex-1 px-4 py-3 text-sm transition-colors ${
                  rightPanelTab === 'theme'
                    ? 'text-white bg-slate-800 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Theme
              </button>
            </div>

            {/* Properties Tab */}
            {rightPanelTab === 'properties' && (
              <div className="flex-1 overflow-y-auto p-4">
                {selectedBlock ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-white mb-3">Selected: {selectedBlock.type}</h3>
                      
                      {/* Content Editor */}
                      {(selectedBlock.type === 'heading' || selectedBlock.type === 'paragraph' || selectedBlock.type === 'button') && (
                        <div className="mb-4">
                          <label className="block text-xs text-slate-400 mb-2">Text Content</label>
                          <input
                            type="text"
                            value={selectedBlock.content.text || ''}
                            onChange={(e) => handleUpdateBlockContent('text', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                          />
                        </div>
                      )}

                      {/* Style Editor */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Text Color</label>
                          <input
                            type="color"
                            value={selectedBlock.styles.color || '#ffffff'}
                            onChange={(e) => handleUpdateBlockStyle('color', e.target.value)}
                            className="w-full h-10 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Background Color</label>
                          <input
                            type="color"
                            value={selectedBlock.styles.backgroundColor || '#1e293b'}
                            onChange={(e) => handleUpdateBlockStyle('backgroundColor', e.target.value)}
                            className="w-full h-10 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Padding</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={parseInt(selectedBlock.styles.padding || '16')}
                            onChange={(e) => handleUpdateBlockStyle('padding', `${e.target.value}px`)}
                            className="w-full"
                          />
                          <div className="text-xs text-slate-500 mt-1">{selectedBlock.styles.padding || '16px'}</div>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Margin</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={parseInt(selectedBlock.styles.margin || '0')}
                            onChange={(e) => handleUpdateBlockStyle('margin', `${e.target.value}px`)}
                            className="w-full"
                          />
                          <div className="text-xs text-slate-500 mt-1">{selectedBlock.styles.margin || '0px'}</div>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Border Radius</label>
                          <input
                            type="range"
                            min="0"
                            max="50"
                            value={parseInt(selectedBlock.styles.borderRadius || '8')}
                            onChange={(e) => handleUpdateBlockStyle('borderRadius', `${e.target.value}px`)}
                            className="w-full"
                          />
                          <div className="text-xs text-slate-500 mt-1">{selectedBlock.styles.borderRadius || '8px'}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-6 border-t border-slate-800 space-y-2">
                        <button
                          onClick={handleDuplicateBlock}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </button>
                        <button
                          onClick={handleDeleteBlock}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Select a component to edit</p>
                  </div>
                )}
              </div>
            )}

            {/* Theme Tab */}
            {rightPanelTab === 'theme' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <h3 className="text-sm text-white mb-3">Current Theme</h3>
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${selectedTheme.preview} mb-3`}></div>
                    <div className="text-white mb-1">{selectedTheme.name}</div>
                    <div className="text-xs text-slate-400">Click to change theme</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-white mb-3">Color Palette</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-2">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-lg border border-slate-700"
                          style={{ backgroundColor: selectedTheme.primaryColor }}
                        ></div>
                        <code className="text-xs text-slate-400">{selectedTheme.primaryColor}</code>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-2">Secondary Color</label>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-lg border border-slate-700"
                          style={{ backgroundColor: selectedTheme.secondaryColor }}
                        ></div>
                        <code className="text-xs text-slate-400">{selectedTheme.secondaryColor}</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-white mb-3">Available Themes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTheme.id === theme.id
                            ? 'border-blue-500 bg-slate-800'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className={`w-full h-16 rounded bg-gradient-to-br ${theme.preview} mb-2`}></div>
                        <div className="text-xs text-white">{theme.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-7xl h-full bg-white rounded-2xl overflow-hidden flex flex-col">
              <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-white" />
                  <h3 className="text-white">Live Preview</h3>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Close Preview
                </button>
              </div>
              <div
                className="flex-1 overflow-auto p-8"
                style={{
                  backgroundColor: selectedTheme.backgroundColor,
                  color: selectedTheme.textColor
                }}
              >
                {blocks.map((block, i) => {
                  switch (block.type) {
                    case 'heading':
                      return <h2 key={i} style={block.styles}>{block.content.text}</h2>;
                    case 'paragraph':
                      return <p key={i} style={block.styles}>{block.content.text}</p>;
                    case 'button':
                      return (
                        <button
                          key={i}
                          style={{
                            ...block.styles,
                            backgroundColor: selectedTheme.primaryColor,
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {block.content.text}
                        </button>
                      );
                    default:
                      return <div key={i} style={block.styles}>{block.content.text}</div>;
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
