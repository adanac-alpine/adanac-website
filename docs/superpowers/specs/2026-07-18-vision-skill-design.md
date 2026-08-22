# Vision Skill & MCP Server — Design Spec

**Date:** 2026-07-18
**Status:** Approved
**Scope:** Global (cross-project) — available to all OpenCode sessions

---

## Problem

Models like `big-pickle` (text-only) cannot process images. When agents need to analyze screenshots, UI layouts, or visual regressions, they have no way to "see." The Playwright MCP provides accessibility snapshots but not visual understanding. Users must manually describe what they see or switch models.

## Goal

Enable any OpenCode agent to analyze images regardless of its underlying model, through a combination of:
1. A lightweight MCP server that wraps a free vision model
2. The opencode-vision plugin that intercepts pasted images
3. A skill that teaches agents when and how to use vision capabilities

## Architecture

Three global components, all project-agnostic:

```
~/.config/opencode/
├── opencode.json              ← add plugin + MCP server entry
├── opencode-vision.json       ← plugin config (model patterns + tool name)
└── zen-vision-mcp/
    └── server.js              ← MCP server (~100 lines)

~/.agents/skills/
└── vision/
    └── SKILL.md               ← the routing/usage skill
```

---

## Component 1: zen-vision MCP Server

**Location:** `~/.config/opencode/zen-vision-mcp/server.js`

**Purpose:** Exposes a single tool `analyze_image` that sends an image + prompt to a free Zen vision model and returns the text response.

### Tool Schema

```json
{
  "name": "analyze_image",
  "description": "Analyze an image using vision AI. Accepts a file path and a question/prompt about the image.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "imagePath": {
        "type": "string",
        "description": "Absolute path to the image file (PNG, JPEG, or WebP)"
      },
      "prompt": {
        "type": "string",
        "description": "What to analyze or ask about the image"
      }
    },
    "required": ["imagePath", "prompt"]
  }
}
```

### Implementation

- **Runtime:** Node.js (no build step, runs via `node server.js`)
- **Dependencies:** `@modelcontextprotocol/sdk`
- **API:** Calls `https://opencode.ai/zen/v1/chat/completions` with `model: "mimo-v2.5-free"`
- **Image format:** Base64-encoded, sent as `image_url` content part in OpenAI-compatible format
- **Auth:** Uses `ZEN_API_KEY` environment variable
- **Error handling:** Returns structured error messages for missing files, unsupported formats, API failures. Never crashes the MCP connection.

### MCP Config Entry

```json
"zen-vision": {
  "type": "local",
  "command": ["node", "/Users/sergeypochikovskiy/.config/opencode/zen-vision-mcp/server.js"],
  "env": {
    "ZEN_API_KEY": "<user's zen api key>"
  }
}
```

---

## Component 2: opencode-vision Plugin Config

### Plugin Installation

Add to `~/.config/opencode/opencode.json`:
```json
"plugin": [
  "superpowers@git+https://github.com/obra/superpowers.git",
  "opencode-vision"
]
```

### User-Level Config

File: `~/.config/opencode/opencode-vision.json`
```json
{
  "models": ["opencode/*"],
  "imageAnalysisTool": "mcp_zen-vision_analyze_image"
}
```

- `models`: Activates for all OpenCode provider models (covers all Zen models)
- `imageAnalysisTool`: Routes to our MCP server's tool name

### How It Works

1. User pastes an image (`Cmd+V` / `Ctrl+V`)
2. Plugin detects image, saves to `/tmp/`
3. Plugin injects prompt instructing the model to call the vision MCP tool
4. Model calls `mcp_zen-vision_analyze_image` with the file path
5. MCP server sends image to MiMo-V2.5 → returns text analysis
6. Model uses the analysis to respond

---

## Component 3: Vision Skill

**Location:** `~/.agents/skills/vision/SKILL.md`

### Purpose

Teaches agents to recognize vision-needed tasks, route them correctly, and use effective analysis prompts.

### Core Behaviors

#### 1. Detect — "Do I need vision?"

Recognize scenarios requiring visual analysis:
- "Does this look right?" / "What's wrong with this layout?"
- Playwright verification (take screenshot → analyze)
- UI comparison (before/after)
- Accessibility audit (visual, not just DOM)
- Design review against specs/Figma
- Debugging visual regressions
- "Take a screenshot and check..."

#### 2. Route — "How do I get vision?"

```
Is the current model vision-capable?
(mimo-v2.5-free, deepseek-v4-flash-free)
├── YES → playwright_browser_take_screenshot
│         → call MCP tool with file path
│         (or just paste and ask — plugin handles it)
│
└── NO (big-pickle, north-mini-code, etc.)
    → playwright_browser_take_screenshot
    → call mcp_zen-vision_analyze_image
    → use the text description to complete the task
```

#### 3. Analyze — "What should I ask?"

Prompt templates for common tasks:

| Task | Prompt |
|------|--------|
| Layout audit | "Describe the visual hierarchy, spacing, alignment, and any layout issues in this screenshot" |
| Accessibility | "Identify contrast issues, text readability problems, and touch target sizes" |
| Visual regression | "Compare these two screenshots. List every visual difference you can find." |
| Design review | "Does this match a clean, professional fintech landing page? List specific issues." |
| Error debugging | "Describe any visual errors, broken layouts, missing elements, or rendering issues" |
| General analysis | "Describe what you see in this image in detail, including text, layout, colors, and any issues" |

#### 4. Model Selection Reference

| Model | Vision | Coding | Best for |
|-------|--------|--------|----------|
| `big-pickle` | No | Unknown/strong | Default coding tasks |
| `mimo-v2.5-free` | Yes | Strong | Vision + coding |
| `deepseek-v4-flash-free` | Yes | Strong | Vision + fast inference |
| `north-mini-code-free` | No | Strong | Coding only |

### What the Skill Does NOT Do

- Auto-switch models (agent decides based on context)
- Replace the plugin (they work together — plugin handles paste, skill handles Playwright)
- Force vision when text-only analysis suffices
- Modify any project files

---

## Cross-Project Availability

All components are global:
- MCP server: `~/.config/opencode/zen-vision-mcp/`
- Plugin config: `~/.config/opencode/opencode-vision.json`
- Skill: `~/.agents/skills/vision/SKILL.md`

Any OpenCode session in any project can use vision capabilities.

---

## Dependencies

- **Node.js** (already required for OpenCode)
- **@modelcontextprotocol/sdk** (MCP server runtime)
- **OpenCode Zen API key** (user already has one — free tier works)
- **opencode-vision plugin** (npm package, auto-installed by OpenCode)

## Testing

1. MCP server: Send a test image path via MCP inspector, verify text response
2. Plugin: Paste an image in OpenCode while on `big-pickle`, verify it routes to vision tool
3. Skill: Start a session, ask agent to "take a screenshot and describe the layout", verify it uses the vision pipeline
4. Cross-project: Repeat test in a different project directory

## Risks

- **MiMo-V2.5 free tier rate limits** — may throttle during heavy use. Mitigation: `deepseek-v4-flash-free` as fallback.
- **Plugin auto-install** — `opencode-vision` is a third-party plugin. If unavailable, the skill still works via manual MCP tool calls.
- **Image quality** — base64 encoding of large screenshots may hit token limits. Mitigation: resize before sending if image exceeds 1920px width.
