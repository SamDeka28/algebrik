#!/bin/bash

# Script to remove static blog pages to avoid conflicts with dynamic [slug] route

echo "Removing static blog pages to use dynamic [slug] route..."

# List of static blog directories to remove
STATIC_BLOGS=(
  "when-the-game-changes"
  "from-piggy-banks-to-product-hooks-why-credit-unions-need-a-feature-strategy"
  "year-one-at-algebrik"
  "credit-union-lessons-from-trendwatch-q2"
  "mastering-digital-onboarding"
  "cable-tv-lending-is-dead"
  "the-future-of-auto-lending"
  "automating-lending-decisions-with-unprecedented-precision"
  "building-digital-first-loyalty-for-credit-unions"
  "how-credit-unions-are-putting-agentic-ai-to-work"
  "the-silent-sabotage"
  "is-your-member-experience-broken"
  "a-product-peek-into-what-is-new-at-algebrik-this-month"
  "what-driving-the-shift-to-intelligent-lending"
  "innovations-reshaping-lending-workflows"
  "what-you-will-learn-in-our-intelligent-lending-roundtable"
  "credit-union-mergers-are-at-an-all-time-high"
  "how-digital-first-credit-unions-are-winning-member-loyalty"
  "beyond_decisioning"
  "redefining_borrower"
  "from_fragmentation_to_seamlessness"
  "out_of_the_lending_maze"
  "algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting"
  "algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions"
)

# Create backup directory
BACKUP_DIR="app/resource-center/static-blogs-backup"
mkdir -p "$BACKUP_DIR"

echo "Backing up static blogs to $BACKUP_DIR..."

# Move static blogs to backup
for blog in "${STATIC_BLOGS[@]}"; do
  if [ -d "app/resource-center/$blog" ]; then
    echo "Moving $blog to backup..."
    mv "app/resource-center/$blog" "$BACKUP_DIR/"
  fi
done

echo "✅ Static blog pages moved to backup directory: $BACKUP_DIR"
echo "✅ Now using dynamic [slug] route from Strapi"
echo ""
echo "To restore static pages later, run:"
echo "mv $BACKUP_DIR/* app/resource-center/"
