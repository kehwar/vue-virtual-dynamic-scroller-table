#!/bin/bash
# Script to compare shadcn layer with demo layer components
# This helps identify any differences between upstream and customized components

echo "=== Comparing shadcn (upstream) vs demo (customized) layers ==="
echo ""

echo "Table Components Comparison:"
echo "----------------------------"
for file in Table.vue TableBody.vue TableCell.vue TableHead.vue TableHeader.vue TableRow.vue index.ts; do
    echo "Comparing $file..."
    if [ -f demo/components/ui/table/$file ]; then
        if diff -q shadcn/components/ui/table/$file demo/components/ui/table/$file > /dev/null 2>&1; then
            echo "  ✓ $file: Identical"
        else
            echo "  ✗ $file: Different"
            echo "    Run: diff shadcn/components/ui/table/$file demo/components/ui/table/$file"
        fi
    else
        echo "  ⚠ $file: Only in shadcn (upstream has additional components)"
    fi
done

echo ""
echo "Additional Components in shadcn (upstream):"
echo "-------------------------------------------"
for file in shadcn/components/ui/table/*.vue shadcn/components/ui/table/*.ts; do
    filename=$(basename "$file")
    if [ ! -f "demo/components/ui/table/$filename" ]; then
        echo "  • $filename"
    fi
done

echo ""
echo "Utilities Comparison:"
echo "--------------------"
if diff -q shadcn/lib/utils.ts demo/lib/utils.ts > /dev/null 2>&1; then
    echo "  ✓ utils.ts: Identical"
else
    echo "  ✗ utils.ts: Different"
    echo "    Run: diff shadcn/lib/utils.ts demo/lib/utils.ts"
fi

echo ""
echo "CSS Comparison:"
echo "--------------"
if diff -q shadcn/assets/css/main.css demo/assets/css/main.css > /dev/null 2>&1; then
    echo "  ✓ main.css: Identical"
else
    echo "  ✗ main.css: Different"
    echo "    Run: diff shadcn/assets/css/main.css demo/assets/css/main.css"
fi
