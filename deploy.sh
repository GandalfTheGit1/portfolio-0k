#!/bin/bash

# Check if a message was provided
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh \"Your commit message\""
    echo "Example: ./deploy.sh \"Add new project links\""
    exit 1
fi

# Execute git commands
git add .
git commit -m "$1"
git push origin main

echo "✅ Deployed successfully with message: $1"
