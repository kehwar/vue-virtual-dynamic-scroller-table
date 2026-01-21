# shadcn Layer

This is a Nuxt layer that contains upstream shadcn-vue components in their original form, sourced directly from the official [shadcn-vue repository](https://github.com/radix-vue/shadcn-vue).

## Purpose

The purpose of this layer is to keep a reference copy of shadcn components as they are upstream for comparison sake. This allows developers to:

- Compare customized versions in other layers (like `demo`) with the original upstream versions
- Track what modifications have been made to the components
- Easily identify differences when updating or debugging
- Maintain a clean baseline for future component updates

## Components Included

Currently, this layer includes:

- **Table Components**: Table, TableBody, TableCaption, TableCell, TableEmpty, TableFooter, TableHead, TableHeader, TableRow

These components are sourced from the official shadcn-vue repository's default style registry.

## Usage

This layer is not meant to be used directly in the application. It serves as a reference layer for comparison purposes only.

You can use the included comparison script to see differences:

```bash
./shadcn/compare.sh
```

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

When shadcn-vue releases updates to components, this layer should be updated to reflect the upstream changes. To update components:

1. Clone or pull the latest version of the shadcn-vue repository:
   ```bash
   git clone https://github.com/radix-vue/shadcn-vue.git
   ```

2. Copy the updated components from the registry:
   ```bash
   cp -r shadcn-vue/deprecated/www/src/registry/default/ui/table/* ./shadcn/components/ui/table/
   ```

3. Run the comparison script to identify changes:
   ```bash
   ./shadcn/compare.sh
   ```

This provides a clean diff between upstream and any customizations made in other layers.

## Source

Components in this layer are sourced from:
- Repository: https://github.com/radix-vue/shadcn-vue
- Path: `deprecated/www/src/registry/default/ui/table/`
- Style: `default`

Note: The official shadcn-vue CLI was not used due to network restrictions. Components are manually synchronized from the official repository to ensure authenticity.
