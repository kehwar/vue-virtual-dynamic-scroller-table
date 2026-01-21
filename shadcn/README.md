# shadcn Layer

This is a Nuxt layer that contains upstream shadcn-vue components in their original form, installed directly using the official [shadcn-vue CLI](https://www.shadcn-vue.com/docs/cli).

## Purpose

The purpose of this layer is to keep a reference copy of shadcn components as they are upstream for comparison sake. This allows developers to:

- Compare customized versions in other layers (like `demo`) with the original upstream versions
- Track what modifications have been made to the components
- Easily identify differences when updating or debugging
- Maintain a clean baseline for future component updates

## Components Included

Currently, this layer includes:

- **Table Components**: Table, TableBody, TableCaption, TableCell, TableEmpty, TableFooter, TableHead, TableHeader, TableRow

These components are installed using the shadcn-vue CLI from the official registry.

## Usage

This layer is not meant to be used directly in the application. It serves as a reference layer for comparison purposes only.

## Structure

```
shadcn/
├── assets/
│   └── css/
│       └── main.css          # Tailwind CSS with shadcn design tokens
├── components/
│   └── ui/
│       └── table/            # Table components from shadcn-vue
│           ├── Table.vue
│           ├── TableBody.vue
│           ├── TableCell.vue
│           ├── TableHead.vue
│           ├── TableHeader.vue
│           ├── TableRow.vue
│           └── index.ts
├── lib/
│   └── utils.ts              # cn() utility function for class merging
├── components.json           # shadcn-nuxt configuration
├── nuxt.config.ts           # Nuxt layer configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

## Maintenance

When shadcn-vue releases updates to components, this layer should be updated to reflect the upstream changes. To update components using the shadcn CLI:

1. Ensure shadcn-vue CLI is installed:
   ```bash
   npm install -g shadcn-vue@latest
   ```

2. Navigate to the shadcn layer directory and use the CLI to update:
   ```bash
   cd shadcn
   shadcn-vue add table -y --cwd .
   ```

To compare differences between upstream and customized components, use standard diff tools:
```bash
diff shadcn/components/ui/table/Table.vue demo/components/ui/table/Table.vue
```

## Source

Components in this layer are sourced from:
- Method: **shadcn-vue CLI** (`shadcn-vue add table`)
- Registry: https://www.shadcn-vue.com/r/styles/default/table.json
- Version: 2.4.3
- Style: `default`

The CLI automatically fetches the latest components from the official shadcn-vue registry and installs all required dependencies.
