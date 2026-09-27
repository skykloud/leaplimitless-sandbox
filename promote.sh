#!/usr/bin/env bash
# ==============================================================================
# Leap Limitless: Promote Sandbox to Published (Production / main)
# ==============================================================================
set -e

# Ensure we are in the repo root
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

echo "=========================================================="
echo "  🚀 Promoting Leap Limitless from 'sandbox' to 'main'   "
echo "=========================================================="

# 1. Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  You have uncommitted changes in your current branch."
  echo "   Please commit or stash your changes before promoting."
  echo ""
  git status -s
  exit 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "sandbox" ]; then
  echo "ℹ️  Currently on branch '$CURRENT_BRANCH'. Switching to 'sandbox'..."
  git checkout sandbox
fi

# 2. Push any local sandbox commits to remote sandbox
echo "📦 Pushing latest 'sandbox' branch to GitHub..."
git push origin sandbox

# 3. Switch to main and sync
echo "🔄 Switching to 'main' (Production)..."
git checkout main
git pull origin main --ff-only || true

# 4. Merge sandbox into main
echo "🔀 Merging 'sandbox' into 'main'..."
git merge sandbox -m "Promote: Release sandbox changes to live site" -X theirs || git merge sandbox -m "Promote: Release sandbox changes to live site"

# 5. Sync sandbox folder on main
echo "🔄 Updating /sandbox directory on main..."
mkdir -p sandbox
git archive sandbox | tar -x -C sandbox
rm -f sandbox/CNAME

# 6. Ensure production CNAME is always leaplimitless.com
echo "leaplimitless.com" > CNAME
git add .
if ! git diff-index --quiet HEAD --; then
  git commit -m "Promote: Finalize live release for leaplimitless.com"
fi

# 7. Push main to trigger live GitHub Pages publication
echo "🚀 Pushing 'main' to GitHub (Publishing live to leaplimitless.com)..."
git push origin main

# 8. Switch back to sandbox for ongoing work
echo "↩️  Switching back to 'sandbox' branch for ongoing work..."
git checkout sandbox

echo ""
echo "=========================================================="
echo "  ✅ Promotion complete! Live site updated successfully.  "
echo "  👉 Production Domain: https://leaplimitless.com         "
echo "  👉 Staging Preview:   https://leaplimitless.com/sandbox/ "
echo "  🌿 You are now back on branch: 'sandbox'                 "
echo "=========================================================="
