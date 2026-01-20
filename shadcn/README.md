# shadcn Layer

This is a Nuxt layer that contains upstream shadcn-vue components in their original form, as provided by the shadcn-vue project.

## Purpose

The purpose of this layer is to keep a reference copy of shadcn components as they are upstream for comparison sake. This allows developers to:

- Compare customized versions in other layers (like `demo`) with the original upstream versions
- Track what modifications have been made to the components
- Easily identify differences when updating or debugging
- Maintain a clean baseline for future component updates

## Components Included

Currently, this layer includes:

- **Table Components**: Table, TableBody, TableCell, TableHead, TableHeader, TableRow

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

When shadcn-vue releases updates to components, this layer should be updated to reflect the upstream changes. This provides a clean diff between upstream and any customizations made in other layers.
